import { OrderOption } from './order-option';

export class Order {
  id: string;
  state: string;
  deliveryEta: string;
  deliveredDate: string;
  orderInfo: {
    orderOption: OrderOption,
    selectedAddOns: [any] // key=addOnTag, val=value
  };
}
