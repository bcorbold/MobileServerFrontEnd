import { AfterViewInit, Component, OnInit } from '@angular/core';

import { isDefined } from '../../../core/is-defined';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'ms-order-history',
  styleUrls: ['order-history.component.scss'],
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent {

  orderHistory: any[];

  constructor(private messageService: MessageService) {
    this.messageService.getOrderHistory()
      .then(orderHistory => {
        this.orderHistory = orderHistory;
        console.log(this.orderHistory[0]);
        console.log(this.orderHistory[0].orderInfo.orderOption.name);
      });
  }

}
