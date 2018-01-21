import { DeliveryLocation } from './delivery-location';

export class UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  adminEnabled: boolean;
  defaultView: string;
  defaultDeliveryLocation: DeliveryLocation;
  locale: string;

  constructor(that: UserInfo) {
    this.username = that.username;
    this.firstName = that.firstName;
    this.lastName = that.lastName;
    this.adminEnabled = that.adminEnabled;
    this.defaultView = that.defaultView;
    this.defaultDeliveryLocation = new DeliveryLocation(that.defaultDeliveryLocation);
    this.locale = that.locale;
  }

}
