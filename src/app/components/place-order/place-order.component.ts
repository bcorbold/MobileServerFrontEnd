import * as _ from 'lodash';

import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { AddOn } from '../../core/add-on';
import { DeliveryLocation } from '../../core/delivery-location';
import { EnvironmentDetails } from '../../core/environment-details';
import { isDefined } from '../../core/is-defined';
import { Order } from '../../core/order';
import { OrderInfo } from '../../core/order-info';
import { OrderOption } from '../../core/order-option';
import { UserInfo } from '../../core/user-info';
import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'ms-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent {

  private _pastOrder: Order;

  @Input() set pastOrder(order: Order) {
    if (isDefined(order)) {
      this._pastOrder = order;
      this.selectedBeverage = OrderOption.copy(this._pastOrder.orderInfo.orderOption);
      this.beverageControl.setValue(this.selectedBeverage.name);
      this.selectedAddOns = [];
      this._pastOrder.orderInfo.selectedAddOns.forEach(addOn => {
        this.selectedAddOns.push(_.defaultsDeep({}, addOn));
      });
    }
  }
  get pastOrder(): Order { return this._pastOrder; }

  environmentDetails: EnvironmentDetails = new EnvironmentDetails();
  userInfo: UserInfo;

  potentialAddOn: AddOn;
  potentialAddOnValue: string | boolean | number = 1;

  selectedDeliveryLocation: DeliveryLocation;
  selectedBeverage: OrderOption;
  selectedAddOns: { key: string, value: string | boolean | number }[] = [];

  locationControl: FormControl;
  filteredLocations: Observable<DeliveryLocation[]>;

  beverageControl: FormControl;
  filteredBeverages: Observable<OrderOption[]>;

  constructor(private messageService: MessageService, private cache: CacheService, private dialog: MatDialog) {
    // getting user/environment information to set up forms
    this.cache.getEnvironmentDetails()
      .then((envDetails: EnvironmentDetails) => this.environmentDetails = envDetails)
      .catch(error => console.error(error));
    this.userInfo = this.cache.user;
    this.selectedDeliveryLocation = DeliveryLocation.copy(this.userInfo.defaultDeliveryLocation);

    // setting up all of the form filtering
    this.locationControl = new FormControl(this.userInfo.defaultDeliveryLocation.name);
    this.filteredLocations = this.locationControl.valueChanges
      .pipe(
        map(locationName => {
          if (locationName) {
            const filteredLocations = this.filterLocations(locationName);
            if (filteredLocations.length === 1) {
              this.selectedDeliveryLocation = filteredLocations[0];
            }
            return filteredLocations;
          } else {
            return this.environmentDetails.deliveryLocations.slice();
          }
        })
      );

    this.beverageControl = new FormControl();
    this.filteredBeverages = this.beverageControl.valueChanges
      .pipe(
        map(beverage => {
          this.selectedAddOns = [];
          this.potentialAddOnValue = 1;
          this.potentialAddOn = undefined;
          if (beverage) {
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

  placeOrder(): void {
    const orderInfo = new OrderInfo(this.selectedBeverage, this.selectedAddOns);

    const modalData = {
      origin: ConfirmationModalComponent.PLACE_ORDER_COMPONENT,
      orderInfo: orderInfo,
      deliveryLocation: this.selectedDeliveryLocation
    };

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {data: modalData});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.messageService.placeOrder(orderInfo, this.selectedDeliveryLocation);
      }
    });
  }

  resetOrder(): void {
    this.selectedBeverage = undefined;
    this.selectedAddOns = [];
    this.potentialAddOn = undefined;
    this.potentialAddOnValue = undefined;
    this.locationControl.reset(this.userInfo.defaultDeliveryLocation.name);
    this.beverageControl.reset();
  }

}
