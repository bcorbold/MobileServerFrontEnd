import { Component } from '@angular/core';

import { Order } from '../../../core/order';
import { UserInfo } from '../../../core/user-info';
import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private _isAdminView: boolean;

  userInfo: UserInfo;
  pastOrder: Order;

  get isAdminView(): boolean {
    return this._isAdminView;
  }
  set isAdminView(isAdminView: boolean) {
    this._isAdminView = isAdminView;
  }

  constructor(private accountService: AccountService) {
    this.userInfo = this.accountService.userInfo;
    this.isAdminView = this.userInfo.defaultView === 'bartender';
  }

  handleUserInfoChange(updatedUserInfo: UserInfo): void {
    this.accountService.updateAccountInfo(updatedUserInfo)
      .then(() => this.userInfo = updatedUserInfo)
      .catch((error) => console.error(error));
  }

  populatePlaceOrder(pastOrder: Order): void {
    this.pastOrder = Order.copy(pastOrder);
  }

}
