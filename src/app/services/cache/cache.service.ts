import * as _ from 'lodash';
import 'rxjs/add/observable/interval';

import { Injectable, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Batch } from '../../core/batch';
import { EnvironmentDetails } from '../../core/environment-details';
import { isDefined } from '../../core/is-defined';
import { OrderStates } from '../../core/lists/order-states';
import { Order } from '../../core/order';
import { SystemDetails } from '../../core/system-details';
import { UserInfo } from '../../core/user-info';
import { MessageService } from '../message/message.service';

@Injectable()
export class CacheService implements OnDestroy {

  private static BATCH_POLLING_RATE = 250;
  private static ORDER_POLLING_RATE = 250;
  private static SYSTEM_DETAILS_POLLING_RATE = 1000;

  private environmentDetails: EnvironmentDetails;

  // todo: running into issues with the cache when batches at empty, and then order is placed
  private batchUpdatesTimer: Observable<number>;
  private batchUpdatesSubscription: Subscription;
  private batchUpdatesSubject: Subject<Batch[]>;
  private batchUpdatesCache: Batch[] = [];

  private orderUpdatesTimer: Observable<number>;
  private orderUpdatesSubscription: Subscription;
  private orderHistorySubject: Subject<Order[]>;
  private orderHistoryCache: Order[] = [];
  private ordersToMonitor: Order[] = [];

  private systemDetailsTimer: Observable<number>;
  private systemDetailsSubscription: Subscription;
  private systemDetailsSubject: Subject<SystemDetails>;
  private systemDetailsCache: SystemDetails;

  user: UserInfo;
  userSubscription: Subscription;
  placedOrderSubscription: Subscription;

  constructor(private messageService: MessageService) {
    this.userSubscription = this.messageService.userUpdates.subscribe(
      (user: UserInfo) => this.user = user,
      error => console.error(error),
      () => this.userSubscription.unsubscribe()
    );
    this.placedOrderSubscription = this.messageService.orderPlacedUpdate.subscribe(
      (order: Order) => {
        if (order.state !== OrderStates.delivered) {
          this.ordersToMonitor.push(order);

          if (isDefined(this.orderHistorySubject)) {
            if (!isDefined(this.orderUpdatesSubscription)) {
              this.orderUpdatesTimer = Observable.interval(CacheService.ORDER_POLLING_RATE);
              this.orderUpdatesSubscription = this.orderUpdatesTimer.subscribe(() => this.handleGetOrderUpdates());
            }
          }
        }
      },
      error => console.log(error),
      () => this.placedOrderSubscription.unsubscribe()
    );
  }

  private handleGetOrderUpdates(): void {
    // this is when the timer has triggered, need to fetch orders from the monitored Orders
    // then merge that with the cache (updating where needed)
    // emit the new cache to the subject

    this.messageService.getOrderUpdates(this.ordersToMonitor).then((orders: Order[]) => {
      let isCacheChanged = false;
      orders.forEach((order: Order) => {
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
            if (order.state === OrderStates.delivered) {
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
        if (isDefined(this.orderHistorySubject)) {
          this.orderHistorySubject.next(this.orderHistoryCache);
        }
      }
    });
  }

  getEnvironmentDetails(): Promise<EnvironmentDetails> {
    if (isDefined(this.environmentDetails)) {
      return new Promise<EnvironmentDetails>(resolve => resolve(this.environmentDetails));
    } else {
      return new Promise<EnvironmentDetails>((resolve, reject) => {
        this.messageService.getEnvironmentDetails()
          .then(environmentDetails => {
            this.environmentDetails = environmentDetails;
            resolve(this.environmentDetails);
          })
          .catch(error => reject(error));
      });
    }
  }

  getIncomingBatches(): Subject<Batch[]> {
    if (!isDefined(this.batchUpdatesSubject)) {
      this.batchUpdatesSubject = new Subject<Batch[]>();
      this.messageService.getIncomingBatches().then((batches: Batch[]) => {
        this.batchUpdatesCache = batches;
        this.batchUpdatesSubject.next(this.batchUpdatesCache);
      });

      this.batchUpdatesTimer = Observable.interval(CacheService.BATCH_POLLING_RATE);
      this.batchUpdatesSubscription = this.batchUpdatesTimer.subscribe(() => {
        this.messageService.getIncomingBatches().then((batches: Batch[]) => {
          let isCacheChanged = false;
          if (batches.length !== this.batchUpdatesCache.length) {
            isCacheChanged = true;
          } else {
            batches.forEach((batch: Batch) => {
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
            this.batchUpdatesCache = batches;
            if (isDefined(this.batchUpdatesSubscription)) {
              this.batchUpdatesSubject.next(this.batchUpdatesCache);
            }
          }
        });
      });

      return this.batchUpdatesSubject;
    } else {
      setTimeout(() => this.batchUpdatesSubject.next(this.batchUpdatesCache));
      return this.batchUpdatesSubject;
    }
  }

  getOrderHistory(): Subject<Order[]> {
    if (!isDefined(this.orderHistorySubject)) {
      this.orderHistorySubject = new Subject<Order[]>();
      this.ordersToMonitor = [];

      this.messageService.getOrderHistory().then((orderHistory: Order[]) => {
        this.orderHistoryCache = _.reverse(_.sortBy(orderHistory, 'orderDate'));

        this.orderHistoryCache.forEach((order: Order) => {
          if (order.state !== OrderStates.delivered) {
            this.ordersToMonitor.push(order);
          }
        });
        this.ordersToMonitor = _.uniqBy(this.ordersToMonitor, 'id');

        if (this.ordersToMonitor.length !== 0 && !isDefined(this.orderUpdatesSubscription)) {
          this.orderUpdatesSubscription = Observable.interval(CacheService.ORDER_POLLING_RATE)
            .subscribe(() => this.handleGetOrderUpdates());
        }

        if (isDefined(this.orderUpdatesSubscription)) {
          this.orderHistorySubject.next(this.orderHistoryCache);
        }
      });

      return this.orderHistorySubject;
    } else {
      setTimeout(() => this.orderHistorySubject.next(this.orderHistoryCache));
      return this.orderHistorySubject;
    }
  }

  getSystemDetails(): Subject<SystemDetails> {
    if (!isDefined(this.systemDetailsSubscription)) {
      this.systemDetailsSubject = new Subject<SystemDetails>();
      this.messageService.getSystemDetails().then((systemDetails: SystemDetails) => this.systemDetailsCache = systemDetails);

      this.systemDetailsTimer = Observable.interval(CacheService.SYSTEM_DETAILS_POLLING_RATE);
      this.systemDetailsSubscription = this.systemDetailsTimer.subscribe(() => {
        this.messageService.getSystemDetails().then((systemDetails: SystemDetails) => {
          // todo: check to see if any updates have occurred, only emit if there is a change
          this.systemDetailsCache = systemDetails;
          if (isDefined(this.systemDetailsSubscription)) {
            this.systemDetailsSubject.next(this.systemDetailsCache);
          }
        });
      });
      return this.systemDetailsSubject;
    } else {
      setTimeout(() => this.systemDetailsSubject.next(this.systemDetailsCache));
      return this.systemDetailsSubject;
    }

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

  unsubscribeFromSystemDetailsUpdates(): void {
    if (isDefined(this.systemDetailsSubscription)) {
      this.systemDetailsSubscription.unsubscribe();
      this.systemDetailsSubscription = undefined;
    }
    if (isDefined(this.systemDetailsTimer)) {
      this.systemDetailsTimer = undefined;
    }
    if (isDefined(this.systemDetailsSubject)) {
      this.systemDetailsSubject.complete();
      this.systemDetailsSubject = undefined;
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.userSubscription = undefined;
    this.unsubscribeFromBatchUpdates();
    this.unsubscribeFromOrderHistoryUpdates();
    this.unsubscribeFromSystemDetailsUpdates();
  }

}
