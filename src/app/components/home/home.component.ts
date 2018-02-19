import { Component } from '@angular/core';

import { Order } from '../../core/order';
import { UserInfo } from '../../core/user-info';
import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private _isAdminView: boolean;

  adminEnabled: boolean;
  pastOrder: Order;
  componentInView: string;

  get isAdminView(): boolean {
    return this._isAdminView;
  }
  set isAdminView(isAdminView: boolean) {
    this._isAdminView = isAdminView;
  }

  constructor(private messageService: MessageService, private cache: CacheService) {
    this.isAdminView = this.cache.user.defaultView === 'bartender';
    this.adminEnabled = this.cache.user.adminEnabled;
    this.componentInView = 'Account Info'; // todo: this is just for easy loading, replace with below line for release
    // this.componentInView = this.isAdminView ? 'Incoming Batches' : 'Place Order';
  }

  handleUserInfoChange(updatedUserInfo: UserInfo): void {
    this.messageService.updateAccountInfo(updatedUserInfo);
  }

  populatePlaceOrder(pastOrder: Order): void {
    this.pastOrder = Order.copy(pastOrder);
  }

}
