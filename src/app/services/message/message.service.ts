// this is required since "Observable" doesn't include interval on import
import 'rxjs/add/observable/interval';

import * as _ from 'lodash';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AppConfig } from '../../app.config';
import { Batch } from '../../core/batch';
import { DeliveryLocation } from '../../core/delivery-location';
import { EnvironmentDetails } from '../../core/environment-details';
import { isDefined } from '../../core/is-defined';
import { Order } from '../../core/order';
import { OrderInfo } from '../../core/order-info';
import { OrderOption } from '../../core/order-option';
import { RobotStatus } from '../../core/robot-status';
import { UserInfo } from '../../core/user-info';

@Injectable()
export class MessageService implements OnDestroy {

  private static BATCH_POLLING_RATE = 5000;
  private static ORDER_POLLING_RATE = 5000;

  private sessionKey: string;
  private user: UserInfo;
  private environmentDetails: EnvironmentDetails;

  private orderUpdatesTimer: Subscription; // todo: should we be saving the observable instead of the subscription?
  private orderHistoryCache: Order[] = [];
  private ordersToMonitor: Order[] = [];
  private orderHistorySubject: Subject<Order[]>;

  private batchPollingTimer: Subscription;
  private incomingBatchesSubscribers: string[] = [];
  private incomingBatchesSubject: Subject<Batch[]>;
  private incomingBatchesCache: Batch[] = [];

  constructor(@Inject(AppConfig) private config: AppConfig, private http: HttpClient) {}

  private fetchEnvironmentDetails(): Promise<EnvironmentDetails> {
    return new Promise<any>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey
      };

      this.http.post(this.config.backendUrl + 'getEnvironmentDetails', body)
        .subscribe((response: EnvironmentDetails) => resolve(response), error => reject(error));
    });
  }

  getEnvironmentDetails(): Promise<EnvironmentDetails> {
    if (isDefined(this.environmentDetails)) {
      return new Promise<EnvironmentDetails>(resolve => resolve(this.environmentDetails));
    } else {
      return this.fetchEnvironmentDetails();
    }
  }

  login(username: string, password: string): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.backendUrl + 'login', {username: username, password: password})
        .subscribe(
          (response: {sessionKey: string, userInfo: UserInfo}) => {
                  this.sessionKey = response.sessionKey;
                  this.user = response.userInfo;
                  resolve(response.userInfo);
                },
          error => reject(error)
        );
    });
  }

  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const body = {username: this.user.username, sessionKey: this.sessionKey};
      this.http.post(this.config.backendUrl + 'logout', body)
        .subscribe(
          () => {
            this.sessionKey = undefined;
            this.user = undefined;
            this.environmentDetails = undefined;
            resolve();
          },
          error => reject(error)
        );
    });
  }

  // todo: based on the state of the order, should start subscribing based on incomplete orders
  fetchOrderHistory(): Promise<Order[]> {
    return new Promise<Order[]>((resolve, reject) => {
      const body = {username: this.user.username, sessionKey: this.sessionKey};
      this.http.post(this.config.backendUrl + 'getOrderHistory', body)
        .subscribe(
          (response: {orderHistory: any}) => {
                  // const orderHistory: Order[] = [];
                  // response.orderHistory.forEach(order => {
                  //     if (isDefined(order.deliveryEta)) {
                  //       order.deliveryEta = new Date(order.deliveryEta);
                  //     }
                  //     if (isDefined(order.orderDate)) {
                  //       order.orderDate = new Date(order.orderDate);
                  //     }
                  //     if (isDefined(order.deliveredDate)) {
                  //       order.deliveredDate = new Date(order.deliveredDate);
                  //     }
                  //     orderHistory.push(order);
                  // });
                  resolve(_.reverse(_.sortBy(response.orderHistory, 'orderDate')));
                },
          error => reject(error)
        );
    });
  }

  getOrderHistory(): Subject<Order[]> {
    if (!isDefined(this.orderHistorySubject)) {
      this.orderHistorySubject = new Subject<Order[]>();
      this.ordersToMonitor = [];
      this.fetchOrderHistory().then((orderHistory: any) => {
        console.log(orderHistory);
        orderHistory.forEach((order: Order) => {
          if (order.state !== 'Delivered') {
            this.ordersToMonitor.push(order);
          }
        });

        if (this.ordersToMonitor.length !== 0) {
          this.orderUpdatesTimer = Observable.interval(MessageService.ORDER_POLLING_RATE)
            .subscribe(() => this.handleGetOrderUpdates());
        }

        this.orderHistorySubject.next(orderHistory);
      }).catch();
      return this.orderHistorySubject;
    }
    return this.orderHistorySubject;
  }

  private handleGetOrderUpdates(): void {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey,
      orders: this.ordersToMonitor
    };
    this.http.post(this.config.backendUrl + 'getOrderUpdates', body)
      .subscribe((response: {orders: Order[]}) => {
        console.log(response);
        response.orders.forEach((order: Order) => {
          const i = _.findIndex(this.orderHistoryCache, order, (o) => {
            return o.id === order.id;
          });
          if (i !== -1) {
            this.orderHistoryCache.splice(i, 1, order);
          } else {
            this.orderHistoryCache.push(order);
          }
          this.orderHistorySubject.next(_.reverse(_.sortBy(this.orderHistoryCache, 'orderDate')));
        });
      });
  }

  updateAccountInfo(user: UserInfo): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const body = {
        username: user.username,
        sessionKey: this.sessionKey,
        userInfo: user
      };
      this.http.post(this.config.backendUrl + 'updateAccountInfo', body)
        .subscribe(() => resolve(), error => reject(error));
    });
  }

  private getUpdatesForOrder(order: Order): void {
    if (this.ordersToMonitor.length === 0) {

    } else {
      this.ordersToMonitor.push(order);
    }
  }

  placeOrder(selectedBeverage: OrderOption, selectedAddOns: {key: string, value: string | boolean | number}[],
             deliveryLocation: DeliveryLocation): Promise<Order> {
    return new Promise<Order>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey,
        orderInfo: new OrderInfo(selectedBeverage, selectedAddOns),
        deliveryLocation: deliveryLocation
      };
      this.http.post(this.config.backendUrl + 'placeOrder', body)
        .subscribe((response: {order: Order}) => {
          this.getUpdatesForOrder(response.order);
            resolve(response.order);
          }, error => reject(error));
    });
  }

  getIncomingBatches(subscriber: string): Subject<Batch[]> {
    if (isDefined(this.incomingBatchesSubject)) {
      setTimeout(() => { // todo: this isn't that nice...
        this.incomingBatchesSubject.next(this.incomingBatchesCache);
      });
      return this.incomingBatchesSubject;
    } else {
      this.incomingBatchesSubject = new Subject<Batch[]>();
      this.incomingBatchesSubscribers.push(subscriber);
      this.incomingBatchesSubscribers = _.uniq(this.incomingBatchesSubscribers);

      // send request now so that we don't have to wait the polling time till the first response
      const body = {username: this.user.username, sessionKey: this.sessionKey};
      this.http.post(this.config.backendUrl + 'getIncomingBatches', body)
        .subscribe((response: {batches: Batch[]}) => {
          this.incomingBatchesCache = response.batches;
          this.incomingBatchesSubject.next(this.incomingBatchesCache);
        });

      this.batchPollingTimer = Observable.interval(MessageService.BATCH_POLLING_RATE).subscribe(() => {
        this.http.post(this.config.backendUrl + 'getIncomingBatches', body)
          .subscribe((response: {batches: Batch[]}) => {
            this.incomingBatchesCache = response.batches;
            this.incomingBatchesSubject.next(this.incomingBatchesCache);
          });
      });
      return this.incomingBatchesSubject;
    }
  }

  sendBatch(batch: Batch): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey,
        batchId: batch.id
      };

      // todo: can we just map this???
      this.http.post(this.config.backendUrl + 'sendBatch', body).subscribe(() => resolve(), error => reject(error));
    });
  }

  getRobotStatusUpdates(): Promise<RobotStatus[]> {
    return new Promise<RobotStatus[]>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey
      };

      this.http.post(this.config.backendUrl + 'getRobotStatusUpdates', body).subscribe(
        (response: {robotStatuses: RobotStatus[]}) => resolve(response.robotStatuses),
        error => reject(error)
      );
    });
  }

  removeIncomingBatchesSubscriber(subscriber: string) {
    this.incomingBatchesSubscribers = _.remove(this.incomingBatchesSubscribers, [subscriber]);

    if (this.incomingBatchesSubscribers.length === 0) {
      this.incomingBatchesSubject.complete();
      this.batchPollingTimer.unsubscribe();
      this.incomingBatchesSubject = undefined;
      this.batchPollingTimer = undefined;
    }
  }

  ngOnDestroy(): void {
    if (isDefined(this.batchPollingTimer)) {
      this.batchPollingTimer.unsubscribe();
      this.batchPollingTimer = undefined;
    }
    if (isDefined(this.incomingBatchesSubject)) {
      this.incomingBatchesSubject.complete();
      this.incomingBatchesSubject = undefined;
    }
  }

}
