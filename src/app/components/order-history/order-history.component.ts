import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { isDefined } from '../../core/is-defined';
import { OrderStates } from '../../core/lists/order-states';
import { Order } from '../../core/order';
import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'ms-order-history',
  styleUrls: ['order-history.component.scss'],
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnDestroy {

  private orderHistorySubscription: Subscription;
  protected OrderStates = OrderStates;

  @Output() reorder: EventEmitter<Order> = new EventEmitter<Order>();
  orderHistory: Order[] = [];

  constructor(private messageService: MessageService, private cache: CacheService) {
    this.orderHistorySubscription = this.cache.getOrderHistory().subscribe((orderHistory: Order[]) => this.orderHistory = orderHistory);
  }

  ngOnDestroy(): void {
    if (isDefined(this.orderHistorySubscription)) {
      this.orderHistorySubscription.unsubscribe();
      this.orderHistorySubscription = undefined;
      this.cache.unsubscribeFromOrderHistoryUpdates();
    }
  }

}
