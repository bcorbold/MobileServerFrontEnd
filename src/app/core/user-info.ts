import { DeliveryLocation } from './delivery-location';

export class UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  adminEnabled: boolean;
  defaultView: string;
  defaultDeliveryLocation: DeliveryLocation;
  locale: string;
}
