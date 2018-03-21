import { DeliveryLocation } from './delivery-location';

export class UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  adminEnabled: boolean;
  defaultView: string;
  defaultDeliveryLocation: DeliveryLocation;
  locale: string;
  pictureUrl: string;

  constructor(that: UserInfo) {
    this.adminEnabled = that.adminEnabled;
    this.defaultDeliveryLocation = DeliveryLocation.copy(that.defaultDeliveryLocation);
    this.username = that.username;
    this.firstName = that.firstName;
    this.lastName = that.lastName;
    this.defaultView = that.defaultView;
    this.locale = that.locale;
    this.pictureUrl = that.pictureUrl;
  }

}
