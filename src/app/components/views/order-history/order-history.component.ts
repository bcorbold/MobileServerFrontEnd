import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { isDefined } from '../../../core/is-defined';
import { Order } from '../../../core/order';
import { MessageService } from '../../../services/message/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ms-order-history',
  styleUrls: ['order-history.component.scss'],
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnDestroy {

  @Output() reorder: EventEmitter<Order> = new EventEmitter<Order>();
  orderHistory: Order[] = [];
  orderHistorySubscription: Subscription;

  constructor(private messageService: MessageService) {
    this.orderHistorySubscription = this.messageService.getOrderHistory().subscribe(
      (orderHistory: Order[]) => this.orderHistory = orderHistory,
      error => console.error(error)
    );
  }

  ngOnDestroy(): void {
    if (isDefined(this.orderHistorySubscription)) {
      this.orderHistorySubscription.unsubscribe();
      this.orderHistorySubscription = undefined;
      this.messageService.unsubscribeFromOrderHistoryUpdates();
    }
  }

}
