import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Order } from '../../core/order';
import { UserInfo } from '../../core/user-info';
import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';
import {
  AccountInfoIdentifier,
  IncomingBatchesIdentifier,
  OrderHistoryIdentifier,
  PlaceOrderIdentifier,
  SystemDetailsIdentifier
} from '../view-identifiers';

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
  isSideNaveOpen = false;

  // todo: need these so that the template can compare them, look for a better way of doing this
  accountInfoId = AccountInfoIdentifier;
  incomingBatchesId = IncomingBatchesIdentifier;
  orderHistoryId = OrderHistoryIdentifier;
  placeOrderId = PlaceOrderIdentifier;
  systemDetailsId = SystemDetailsIdentifier;

  get isAdminView(): boolean {
    return this._isAdminView;
  }
  set isAdminView(isAdminView: boolean) {
    this._isAdminView = isAdminView;
  }

  constructor(private messageService: MessageService, private cache: CacheService,
              private router: Router, private snackBar: MatSnackBar) {
    this.isAdminView = this.cache.user.defaultView === 'bartender';
    this.adminEnabled = this.cache.user.adminEnabled;
    this.componentInView = this.isAdminView ? IncomingBatchesIdentifier : PlaceOrderIdentifier;
  }

  handleUserInfoChange(updatedUserInfo: UserInfo): void {
    this.messageService.updateAccountInfo(updatedUserInfo)
      .catch(err => {
        this.snackBar.open('Encountered an error while trying to update account information.', 'Dismiss', {
          duration: 30000,
          panelClass: 'mat-snack-bar-error'
        });
      });
  }

  populatePlaceOrder(pastOrder: Order): void {
    this.pastOrder = Order.copy(pastOrder);
    this.componentInView = 'Place Order';
  }

  switchView(componentInView: string): void {
    this.componentInView = componentInView;
    this.isSideNaveOpen = false;
  }

  logout(): void {
    this.messageService.logout().then(() => this.router.navigate(['/']));
  }

}
