import { OrderOption } from './order-option';

export class Order {
  id: string;
  state: string;
  deliveryEta: string;
  orderDate: string;
  deliveredDate: string;
  orderInfo: {
    orderOption: OrderOption,
    selectedAddOns: [{key: string, value: boolean | number | string}] // key=addOnTag, val=value
  };
}
