import { Component, OnInit } from '@angular/core';

import { Order } from '../../core/order';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'ms-order-history',
  styleUrls: ['order-history.component.scss'],
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnInit {

  orderHistory: Order[];

  constructor(private messageService: MessageService) {
    this.orderHistory = [];
  }

  ngOnInit(): void {
    this.orderHistory = this.messageService.getOrderHistory();
  }

}
