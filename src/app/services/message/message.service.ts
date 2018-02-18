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

  private static BATCH_POLLING_RATE = 250;
  private static ORDER_POLLING_RATE = 250;
  private static DELIVERED = 'Delivered';
  private static WAITING = 'Waiting';
  private static DELIVERING = 'Delivering';
  private static DELAYED = 'Delayed';

  private sessionKey: string;

  private orderUpdatesTimer: Observable<number>;
  private orderUpdatesSubscription: Subscription;
  private orderHistoryCache: Order[] = [];
  private ordersToMonitor: Order[] = [];
  private orderHistorySubject: Subject<Order[]>;

  private batchUpdatesTimer: Observable<number>;
  private batchUpdatesSubscription: Subscription;
  private batchUpdatesSubject: Subject<Batch[]>;
  private batchUpdatesCache: Batch[] = [];



  // methods after cache update
  private user: UserInfo; // todo: would be nice to get rid of this, don't think it's possible
  userUpdates: Subject<UserInfo> = new Subject<UserInfo>();

  constructor(@Inject(AppConfig) private config: AppConfig, private http: HttpClient) {}

  // todo: checked
  getEnvironmentDetails(): Promise<EnvironmentDetails> {
    return new Promise<any>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey
      };

      this.http.post(this.config.backendUrl + 'getEnvironmentDetails', body)
        .subscribe((response: EnvironmentDetails) => resolve(response), error => reject(error));
    });
  }

  login(username: string, password: string): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.backendUrl + 'login', {username: username, password: password})
        .subscribe(
          (response: {sessionKey: string, userInfo: UserInfo}) => {
            this.sessionKey = response.sessionKey;
            this.user = response.userInfo;
            this.userUpdates.next(this.user);
            resolve();
          },
          error => reject('Invalid username or password') // todo: can do a better job of handling this
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
            this.userUpdates.next(undefined);
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
        .subscribe(
          () => {
            this.user = user;
            this.userUpdates.next(this.user);
            resolve();
          },
          error => reject(error));
    });
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
          let isCacheChanged = false;
          response.orders.forEach((order: Order) => {
            const i = _.findIndex(this.orderHistoryCache, (cachedOrder: Order) => {
              return cachedOrder.id === order.id;
            });

            if (i === -1) {
              this.orderHistoryCache.push(order);
              isCacheChanged = true;
            } else {
              const cachedOrder = this.orderHistoryCache[i];
              if (order.state !== cachedOrder.state || order.deliveryEta !== cachedOrder.deliveryEta) {
                this.orderHistoryCache[i] = order;
                isCacheChanged = true;
                if (order.state === MessageService.DELIVERED) {
                  const j = _.findIndex(this.ordersToMonitor, (monitoredOrder: Order) => {
                    return monitoredOrder.id === order.id;
                  });
                  this.ordersToMonitor.splice(j, 1);
                }
              }
            }
          });

          if (isCacheChanged) {
            this.orderHistoryCache = _.reverse(_.sortBy(this.orderHistoryCache, 'orderDate'));
            this.orderHistorySubject.next(this.orderHistoryCache);
          }
        },
        error => console.error(error));
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
            // todo: check if there is a change
            let isCacheChanged = false;
            if (response.batches.length !== this.batchUpdatesCache.length) {
              isCacheChanged = true;
            } else {
              // state, batchEta
              response.batches.forEach((batch: Batch) => {
                const i = _.findIndex(this.batchUpdatesCache, (cachedBatch: Batch) => {
                  return cachedBatch.id === batch.id;
                });
                if (this.batchUpdatesCache[i].state !== batch.state || this.batchUpdatesCache[i].batchEta !== batch.batchEta) {
                  isCacheChanged = true;
                  return;
                }
              });
            }

            if (isCacheChanged) {
              this.batchUpdatesCache = response.batches;
              this.batchUpdatesSubject.next(this.batchUpdatesCache);
            }
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

}
