import { Component, OnInit } from '@angular/core';

import { isDefined } from '../../../core/is-defined';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'ms-order-history',
  styleUrls: ['order-history.component.scss'],
  templateUrl: './order-history.component.html'
})
export class OrderHistoryComponent implements OnInit {

  orderHistory: any[];

  currentPage = 1;
  scrollDebounce;
  selectDebounce;
  pageSelected = false;

  constructor(private messageService: MessageService) {
    this.orderHistory = [];
  }

  ngOnInit(): void {
    this.orderHistory = this.messageService.getOrderHistory();
    this.orderHistory.forEach(order => {
      if (isDefined(order.deliveryEta)) {
        order.deliveryEta = new Date(order.deliveryEta);
      }
      if (isDefined(order.orderDate)) {
        order.orderDate = new Date(order.orderDate);
      }
      if (isDefined(order.deliveredDate)) {
        order.deliveredDate = new Date(order.deliveredDate);
      }
    });
  }

  onNewPageSelected(newPage: number) {
    this.currentPage = newPage;
    const batchContainer = document.getElementsByClassName('ms-order-history-container')[0];
    const divs = this.getDivHeights();
    let value = 0;
    for (let i = 0; i < newPage - 1; i++) {
      value = value + divs[i];
    }
    clearTimeout(this.selectDebounce);
    this.pageSelected = true;
    this.selectDebounce = setTimeout(() => {
      this.pageSelected = false;
    }, 100);
    batchContainer.scrollTop = value;
  }

  getDivHeights(): number[] {
    const divs = [];
    const batchContainer = document.getElementsByClassName('ms-order-history-container')[0];
    for (let i = 0; i < batchContainer.children.length; i++) {
      divs.push((<HTMLElement>batchContainer.children[0]).offsetHeight);
    }
    return divs;
  }

  onScroll() {
    clearTimeout(this.scrollDebounce);
    if (!this.pageSelected) {
      this.scrollDebounce = setTimeout(() => {
        const batchContainer = document.getElementsByClassName('ms-order-history-container')[0];
        this.currentPage = 1;
        const divs = this.getDivHeights();
        let adder = 0;
        for (let i = 0; i < divs.length; i++) {
          if (adder >= batchContainer.scrollTop) {
            this.currentPage = i + 1;
            break;
          }
          adder = adder + divs[i];
        }
      }, 100);
    }
  }

}
