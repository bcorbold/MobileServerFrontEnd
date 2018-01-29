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
  ready?: boolean;

  static copy(that: Order): Order {
    const order: Order = new Order();

    order.id = that.id;
    order.state = that.state;
    order.deliveryEta = that.deliveryEta;
    order.orderDate = that.orderDate;
    order.deliveredDate = that.deliveredDate;

    // if (isDefined(that.deliveryEta)) { // todo: this causes the null fields in "that" to not exist on the copied object
    //   order.deliveryEta = new Date(that.deliveryEta);
    // }
    // if (isDefined(that.orderDate)) {
    //   order.orderDate = new Date(that.orderDate);
    // }
    // if (isDefined(that.deliveredDate)) {
    //   order.deliveredDate = new Date(that.deliveredDate);
    // }
    order.orderInfo = OrderInfo.copy(that.orderInfo);
    order.deliveryLocation = DeliveryLocation.copy(that.deliveryLocation);
    if (isDefined(that.ready)) {
      order.ready = that.ready;
    }
    return order;
  }

  constructor() {}
}
