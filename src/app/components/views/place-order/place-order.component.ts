import * as _ from 'lodash';

import { Component, Input } from '@angular/core';

import { AddOn } from '../../../core/add-on';
import { DeliveryLocation } from '../../../core/delivery-location';
import { EnvironmentDetails } from '../../../core/environment-details';
import { isDefined } from '../../../core/is-defined';
import { Order } from '../../../core/order';
import { OrderOption } from '../../../core/order-option';
import { UserInfo } from '../../../core/user-info';
import { AccountService } from '../../../services/account/account.service';
import { MessageService } from '../../../services/message/message.service';


@Component({
  selector: 'ms-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent {

  private _pastOrder: Order;
  get pastOrder(): Order { return this._pastOrder; }
  @Input() set pastOrder(order: Order) {
    if (isDefined(order)) {
      this._pastOrder = order;
      this.selectedDeliveryLocation = DeliveryLocation.copy(this._pastOrder.deliveryLocation);
      // todo: populates value in form, but drink name isn't displayed
      this.selectedBeverage = OrderOption.copy(this._pastOrder.orderInfo.orderOption);
      this.selectedAddOns = [];
      this._pastOrder.orderInfo.selectedAddOns.forEach(addOn => {
        this.selectedAddOns.push(_.defaultsDeep({}, addOn));
      });
    }
  }

  // todo: Need to reset lower levels of the form when higher level changes
  environmentDetails: EnvironmentDetails;
  potentialAddOn: AddOn;
  potentialAddOnValue: string | boolean | number = 1;

  userInfo: UserInfo;
  selectedDeliveryLocation: DeliveryLocation;
  selectedBeverage: OrderOption;
  selectedAddOns: { key: string, value: string | boolean | number }[] = [];

  constructor(private messageService: MessageService, private accountService: AccountService) {
    this.environmentDetails = new EnvironmentDetails();
    this.messageService.getEnvironmentDetails()
      .then((envDetails) => {
        this.environmentDetails = envDetails;
      })
      .catch(error => console.error(error));
    this.userInfo = this.accountService.userInfo;
    this.selectedDeliveryLocation = DeliveryLocation.copy(this.userInfo.defaultDeliveryLocation);
  }

  addAddOnToSelectedList(): void {
    if (this.potentialAddOn.type !== 'boolean') {
      this.selectedAddOns.push({key: this.potentialAddOn.name, value: this.potentialAddOnValue});
    } else {
      this.selectedAddOns.push({key: this.potentialAddOn.name, value: true});
    }
  }

  removeAddOnChip(addOnChip: { key: string, value: string | boolean | number }) {
    this.selectedAddOns = _.pull(this.selectedAddOns, addOnChip);
  }

  placeOrder(): void { // todo: Should give the user some sort of feedback on the response
    this.messageService.placeOrder(this.selectedBeverage, this.selectedAddOns, this.selectedDeliveryLocation)
      .then(response => {
        console.log('Order has been placed');
        // todo: subscribe to updates on the orderHistory
      })
      .catch(error => console.error(error));
  }

  resetOrder(): void {
    this.selectedDeliveryLocation = DeliveryLocation.copy(this.userInfo.defaultDeliveryLocation);
    this.selectedBeverage = undefined;
    this.selectedAddOns = [];
    this.potentialAddOn = undefined;
    this.potentialAddOnValue = undefined;
  }

}
