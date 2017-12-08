import { DeliveryLocation } from './delivery-location';

export class User {
  username: string;
  firstName: string;
  lastName: string;
  adminEnabled: boolean;
  deskLocation: DeliveryLocation;
  locale: string;
}
