import { Injectable, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/observable/interval';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Batch } from '../../core/batch';
import { EnvironmentDetails } from '../../core/environment-details';
import { isDefined } from '../../core/is-defined';
import { UserInfo } from '../../core/user-info';
import { MessageService } from '../message/message.service';
import { Order } from '../../core/order';

@Injectable()
export class CacheService implements OnDestroy {

  private static BATCH_POLLING_RATE = 250;
  private static ORDER_POLLING_RATE = 250;
  private static DELIVERED = 'Delivered';
  private static WAITING = 'Waiting';
  private static DELIVERING = 'Delivering';
  private static DELAYED = 'Delayed';

  private environmentDetails: EnvironmentDetails;

  private batchUpdatesTimer: Observable<number>;
  private batchUpdatesSubscription: Subscription;
  private batchUpdatesSubject: Subject<Batch[]>;
  private batchUpdatesCache: Batch[] = [];

  private orderUpdatesTimer: Observable<number>;
  private orderUpdatesSubscription: Subscription;
  private orderHistoryCache: Order[] = [];
  private ordersToMonitor: Order[] = [];
  private orderHistorySubject: Subject<Order[]>;

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
        if (order.state !== CacheService.DELIVERED) {
          this.ordersToMonitor.push(order);
          if (!isDefined(this.orderUpdatesSubscription)) {
            this.orderUpdatesTimer = Observable.interval(CacheService.ORDER_POLLING_RATE);
            this.orderUpdatesSubscription = this.orderUpdatesTimer.subscribe(() => this.handleGetOrderUpdates());
          }
        }
      },
      error => console.log(error),
      () => this.placedOrderSubscription.unsubscribe()
    );
  }

  getEnvironmentDetails(): Promise<EnvironmentDetails> {
    if (isDefined(this.environmentDetails)) {
      return new Promise<EnvironmentDetails>(resolve => resolve(this.environmentDetails));
    } else {
      return this.messageService.getEnvironmentDetails();
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
          // todo: check if there is a change
          let isCacheChanged = false;
          if (batches.length !== this.batchUpdatesCache.length) {
            isCacheChanged = true;
          } else {
            // state, batchEta
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

  // todo: should have a think about if there will be 2 components that need this and how that will be handled
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

  getOrderHistory(): Subject<Order[]> {
    if (!isDefined(this.orderHistorySubject)) {
      this.orderHistorySubject = new Subject<Order[]>();
      this.ordersToMonitor = [];

      this.messageService.getOrderHistory().then((orderHistory: Order[]) => {
        this.orderHistoryCache = _.reverse(_.sortBy(orderHistory, 'orderDate'));

        this.orderHistoryCache.forEach((order: Order) => {
          if (order.state !== CacheService.DELIVERED) {
            this.ordersToMonitor.push(order);
          }
        });
        this.ordersToMonitor = _.uniqBy(this.ordersToMonitor, 'id');

        if (this.ordersToMonitor.length !== 0 && !isDefined(this.orderUpdatesSubscription)) {
          this.orderUpdatesSubscription = Observable.interval(CacheService.ORDER_POLLING_RATE)
            .subscribe(() => this.handleGetOrderUpdates());
        }

        this.orderHistorySubject.next(this.orderHistoryCache);
      });


      return this.orderHistorySubject;
    } else {
      setTimeout(() => this.orderHistorySubject.next(this.orderHistoryCache));
      return this.orderHistorySubject;
    }
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
            if (order.state === CacheService.DELIVERED) {
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
    });
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
    this.userSubscription.unsubscribe();
    this.userSubscription = undefined;

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
