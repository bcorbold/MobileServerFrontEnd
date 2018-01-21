import { DeliveryLocation } from './delivery-location';
import { OrderOption } from './order-option';

export class EnvironmentDetails {
  deliveryLocations: DeliveryLocation[];
  locales: string[];
  orderOptions: OrderOption[];
  uiViews: string[];

  constructor() {
    this.deliveryLocations = [];
    this.locales = [];
    this.orderOptions = [];
    this.uiViews = [];
  }
}
