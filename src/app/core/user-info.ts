import { Coordinate } from './coordinate';
import { DeliveryLocation } from './delivery-location';

export class UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  adminEnabled: boolean;
  defaultView: string;
  defaultDeliveryLocation: DeliveryLocation;
  pickupLocation: Coordinate;
  locale: string;
  pictureUrl: string;

  constructor(that: UserInfo) {
    this.username = that.username;
    this.firstName = that.firstName;
    this.lastName = that.lastName;
    this.adminEnabled = that.adminEnabled;
    this.defaultView = that.defaultView;
    this.defaultDeliveryLocation = DeliveryLocation.copy(that.defaultDeliveryLocation);
    this.pickupLocation = Coordinate.copy(that.pickupLocation);
    this.locale = that.locale;
    this.pictureUrl = that.pictureUrl;
  }

}
