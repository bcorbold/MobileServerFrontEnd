import { DeliveryLocation } from './delivery-location';
import { OrderOption } from './order-option';
import { RobotInfo } from './robot-info';

export class EnvironmentDetails {
  deliveryLocations: DeliveryLocation[];
  locales: string[];
  orderOptions: OrderOption[];
  uiViews: string[];
  configuredRobots: RobotInfo[];

  constructor() {
    this.deliveryLocations = [];
    this.locales = [];
    this.orderOptions = [];
    this.uiViews = [];
    this.configuredRobots = [];
  }
}
