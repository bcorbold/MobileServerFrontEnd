import * as _ from 'lodash';

import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';

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
      this._pastOrder = order; // todo: populates value in form, but drink name isn't displayed
      this.selectedBeverage = OrderOption.copy(this._pastOrder.orderInfo.orderOption);
      this.selectedAddOns = [];
      this._pastOrder.orderInfo.selectedAddOns.forEach(addOn => {
        this.selectedAddOns.push(_.defaultsDeep({}, addOn));
      });
    }
  }

  // todo: Need to reset lower levels of the form when higher level changes
  environmentDetails: EnvironmentDetails = new EnvironmentDetails();
  potentialAddOn: AddOn;
  potentialAddOnValue: string | boolean | number = 1;

  userInfo: UserInfo;
  selectedBeverage: OrderOption;
  selectedAddOns: { key: string, value: string | boolean | number }[] = [];



  locationControl: FormControl;
  filteredLocations: Observable<DeliveryLocation[]>;

  beverageControl: FormControl;
  filteredBeverages: Observable<OrderOption[]>;

  constructor(private messageService: MessageService, private accountService: AccountService) {
    // getting user/environment information to set up forms
    this.messageService.getEnvironmentDetails()
      .then((envDetails: EnvironmentDetails) => this.environmentDetails = envDetails)
      .catch(error => console.error(error));
    this.userInfo = this.accountService.userInfo;

    // setting up all of the form filtering
    this.locationControl = new FormControl(this.userInfo.defaultDeliveryLocation.name);
    this.filteredLocations = this.locationControl.valueChanges
      .pipe(
        map(locationName => locationName ? this.filterLocations(locationName) : this.environmentDetails.deliveryLocations.slice())
      );

    this.beverageControl = new FormControl();
    this.filteredBeverages = this.beverageControl.valueChanges
      .pipe(
        map(beverage => {
          if (isDefined(beverage)) {
            const filteredBeverages = this.filterBeverages(beverage);
            if (filteredBeverages.length === 1) {
              this.selectedBeverage = filteredBeverages[0];
            }
            return filteredBeverages;
          } else {
            return this.environmentDetails.orderOptions.slice();
          }
        })
      );
  }

  filterLocations(locationName: string): DeliveryLocation[] {
    return this.environmentDetails.deliveryLocations.filter((location: DeliveryLocation) =>
    location.name.toLowerCase().indexOf(locationName.toLowerCase()) !== -1);
  }

  filterBeverages(name: string): OrderOption[] {
    return this.environmentDetails.orderOptions.filter(beverage =>
      beverage.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }






  addAddOnToSelectedList(): void {
    let existingIndex: number;

    this.selectedAddOns.forEach((addOn, index) => {
      if (addOn.key.toLowerCase() === this.potentialAddOn.name.toLowerCase()) {
        existingIndex = index;
        return;
      }
    });

    if (isDefined(existingIndex)) {
      this.selectedAddOns[existingIndex] = this.potentialAddOn.type === 'boolean' ?
                                          {key: this.potentialAddOn.name, value: true} :
                                          {key: this.potentialAddOn.name, value: this.potentialAddOnValue};
    } else {
      this.selectedAddOns.push(this.potentialAddOn.type === 'boolean' ?
                              {key: this.potentialAddOn.name, value: true} :
                              {key: this.potentialAddOn.name, value: this.potentialAddOnValue});
    }
  }

  removeAddOnChip(addOnChip: { key: string, value: string | boolean | number }) {
    this.selectedAddOns = _.pull(this.selectedAddOns, addOnChip);
  }

  // todo: need to add validation to the form
  placeOrder(): void { // todo: Should give the user some sort of feedback on the response
    console.log(this.selectedBeverage);
    console.log(this.selectedAddOns);

    // this.messageService.placeOrder(this.selectedBeverage, this.selectedAddOns, this.selectedDeliveryLocation)
    //   .then(response => {
    //     console.log('Order has been placed');
    //     // todo: subscribe to updates on the orderHistory
    //   })
    //   .catch(error => console.error(error));
  }

  resetOrder(): void {
    // this.selectedDeliveryLocation = DeliveryLocation.copy(this.userInfo.defaultDeliveryLocation);
    this.selectedBeverage = undefined;
    this.selectedAddOns = [];
    this.potentialAddOn = undefined;
    this.potentialAddOnValue = undefined;
    this.locationControl.reset(this.userInfo.defaultDeliveryLocation.name);
    this.beverageControl.reset();
  }

}
