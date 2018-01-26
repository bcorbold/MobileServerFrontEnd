import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';

import { isDefined } from '../../../core/is-defined';
import { Order } from '../../../core/order';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'ms-order-history',
  styleUrls: ['order-history.component.scss'],
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent {

  @Output() reorder: EventEmitter<Order> = new EventEmitter<Order>();
  orderHistory: Order[] = [];

  constructor(private messageService: MessageService) {
    this.messageService.getOrderHistory()
      .then(orderHistory => this.orderHistory = orderHistory );
  }

}
