/* tslint:disable */

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
  private static WAITING = 'Wiating';
  private static DELIVERING = 'Delivering';
  private static DELIVERED = 'Delivered';
  private static DELAYED = 'Delayed';

  private sessionKey: string;
  private user: UserInfo;
  private environmentDetails: EnvironmentDetails;

  private orderUpdatesTimer: Observable<number>;
  private orderUpdatesSubscription: Subscription;
  private orderHistoryCache: Order[] = [];
  private ordersToMonitor: Order[] = [];
  private orderHistorySubject: Subject<Order[]>;

  // private incomingBatchesSubscribers: string[] = []; // todo: why do we need this?
  private batchUpdatesTimer: Observable<number>;
  private batchUpdatesSubscription: Subscription;
  private batchUpdatesSubject: Subject<Batch[]>;
  private batchUpdatesCache: Batch[] = [];

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

  getIncomingBatches(): Subject<Batch[]> {
    if (!isDefined(this.batchUpdatesSubject)) {
      this.batchUpdatesSubject = new Subject<Batch[]>();
      const body = {username: this.user.username, sessionKey: this.sessionKey};
      this.http.post(this.config.backendUrl + 'getIncomingBatches', body)
        .subscribe((response: {batches: Batch[]}) => {
          // send request now so that we don't have to wait the polling time till the first response
          this.batchUpdatesCache = response.batches;
          this.batchUpdatesSubject.next(this.batchUpdatesCache);
        });

      this.batchUpdatesTimer = Observable.interval(MessageService.BATCH_POLLING_RATE);
      this.batchUpdatesSubscription = this.batchUpdatesTimer.subscribe(() => {
        this.http.post(this.config.backendUrl + 'getIncomingBatches', body)
          .subscribe((response: {batches: Batch[]}) => {
            this.batchUpdatesCache = response.batches;
            this.batchUpdatesSubject.next(this.batchUpdatesCache);
          });
      });

      return this.batchUpdatesSubject;
    } else {
      setTimeout(() => this.batchUpdatesSubject.next(this.batchUpdatesCache));
      return this.batchUpdatesSubject;
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

  unsubscribeFromBatchUpdates(): void {
    if (isDefined(this.batchUpdatesSubscription)) {
      this.batchUpdatesSubscription.unsubscribe();
      this.batchUpdatesSubscription = undefined;
    }
    if (isDefined(this.batchUpdatesTimer)) {
      this.batchUpdatesTimer = undefined;
    }
    if (isDefined(this.batchUpdatesSubject)) {
      this.batchUpdatesSubject.complete();
      this.batchUpdatesSubject = undefined;
    }

  }

  ngOnDestroy(): void {
    if (isDefined(this.batchUpdatesSubscription)) {
      this.batchUpdatesSubscription.unsubscribe();
      this.batchUpdatesSubscription = undefined;
    }
    if (isDefined(this.batchUpdatesSubject)) {
      this.batchUpdatesSubject.complete();
      this.batchUpdatesSubject = undefined;
    }
    if (isDefined(this.orderUpdatesSubscription)) {
      this.orderUpdatesSubscription.unsubscribe();
      this.orderUpdatesSubscription = undefined;
    }
    if (isDefined(this.orderHistorySubject)) {
      this.orderHistorySubject.complete();
      this.orderHistorySubject = undefined;
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
          if (response.order.state !== MessageService.DELIVERED) {
            this.ordersToMonitor.push(response.order);
            if (!isDefined(this.orderUpdatesSubscription)) {
              this.orderUpdatesTimer = Observable.interval(MessageService.ORDER_POLLING_RATE);
              this.orderUpdatesSubscription = this.orderUpdatesTimer.subscribe(() => this.handleGetOrderUpdates());
            }
          }
          resolve(response.order);
        }, error => reject(error));
    });
  }

  getOrderHistory(): Subject<Order[]> {
    if (!isDefined(this.orderHistorySubject)) {
      this.orderHistorySubject = new Subject<Order[]>();
      this.ordersToMonitor = [];

      const body = {username: this.user.username, sessionKey: this.sessionKey};
      this.http.post(this.config.backendUrl + 'getOrderHistory', body).subscribe(
        (response: {orderHistory: Order}) => {
                this.orderHistoryCache = _.reverse(_.sortBy(response.orderHistory, 'orderDate'));

                this.orderHistoryCache.forEach((order: Order) => {
                  if (order.state !== MessageService.DELIVERED) {
                    this.ordersToMonitor.push(order);
                  }
                });
                this.ordersToMonitor = _.uniqBy(this.ordersToMonitor, 'id');

                if (this.ordersToMonitor.length !== 0 && !isDefined(this.orderUpdatesSubscription)) {
                  this.orderUpdatesSubscription = Observable.interval(MessageService.ORDER_POLLING_RATE)
                    .subscribe(() => this.handleGetOrderUpdates());
                }

                this.orderHistorySubject.next(this.orderHistoryCache);
              },
        error => console.error(error));
      return this.orderHistorySubject;
    }
    setTimeout(() => this.orderHistorySubject.next(this.orderHistoryCache));
    return this.orderHistorySubject;
  }

  unsubscribeFromOrderHistoryUpdates(): void {
    if (isDefined(this.orderUpdatesSubscription)) {
      this.orderUpdatesSubscription.unsubscribe();
      this.orderUpdatesSubscription = undefined;
    }
    if (isDefined(this.orderUpdatesTimer)) {
      this.orderUpdatesTimer = undefined;
    }
    if (isDefined(this.orderHistorySubject)) {
      this.orderHistorySubject.complete();
      this.orderHistorySubject = undefined;
    }
  }

  private handleGetOrderUpdates(): void {
    // this is when the timer has triggered, need to fetch orders from the monitored Orders
    // then merge that with the cache (updating where needed)
    // emit the new cache to the subject

    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey,
      orders: this.ordersToMonitor
    };
    this.http.post(this.config.backendUrl + 'getOrderUpdates', body)
      .subscribe(
        (response: {orders: Order[]}) => {
                response.orders.forEach((order: Order) => {
                  const i = _.findIndex(this.orderHistoryCache, (cachedOrder: Order) => {
                    return cachedOrder.id === order.id;
                  });

                  console.log('i: ' + i);
                  if (i === -1) {
                    this.orderHistoryCache.push(order);
                  } else {
                    this.orderHistoryCache[i] = order;
                  }

                  if (order.state === MessageService.DELIVERED) {
                    const j = _.findIndex(this.ordersToMonitor, (monitoredOrder: Order) => {
                      return monitoredOrder.id === order.id;
                    });
                    console.log('j: ' + j);
                    this.ordersToMonitor.splice(j, 1);
                  }
                });

                this.orderHistoryCache = _.reverse(_.sortBy(this.orderHistoryCache, 'orderDate'));
                this.orderHistorySubject.next(this.orderHistoryCache);
              },
        error => console.error(error));
  }

}
