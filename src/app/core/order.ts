import { DeliveryLocation } from './delivery-location';
import { OrderOption } from './order-option';

export class Order {
  id: string;
  state: string;
  deliveryEta: Date;
  orderDate: Date;
  deliveredDate: Date;
  orderInfo: {
    orderOption: OrderOption,
    selectedAddOns: [{key: string, value: boolean | number | string}] // key=addOnTag, val=value
  };
  deliveryLocation: DeliveryLocation;
}
