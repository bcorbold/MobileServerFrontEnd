import { DeliveryLocation } from './delivery-location';
import { isDefined } from './is-defined';
import { OrderInfo } from './order-info';

export class Order {
  id: string;
  state: string;
  deliveryEta: string;
  orderDate: string;
  deliveredDate: string;
  orderInfo: OrderInfo;
  deliveryLocation: DeliveryLocation;
  username: string;
  ready?: boolean;

  static copy(that: Order): Order {
    const order: Order = new Order();

    order.id = that.id;
    order.state = that.state;
    order.deliveryEta = that.deliveryEta;
    order.orderDate = that.orderDate;
    order.deliveredDate = that.deliveredDate;
    order.orderInfo = OrderInfo.copy(that.orderInfo);
    order.deliveryLocation = DeliveryLocation.copy(that.deliveryLocation);
    order.username = that.username;
    if (isDefined(that.ready)) {
      order.ready = that.ready;
    }
    return order;
  }

  constructor() {}
}
