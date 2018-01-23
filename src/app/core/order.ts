import { DeliveryLocation } from './delivery-location';
import { OrderInfo } from './order-info';
import { isDefined } from './is-defined';

export class Order {
  id: string;
  state: string;
  deliveryEta: Date;
  orderDate: Date;
  deliveredDate: Date;
  orderInfo: OrderInfo;
  deliveryLocation: DeliveryLocation;
  completed?: boolean;

  static copy(that: Order): Order {
    const order: Order = new Order();

    order.id = that.id;
    order.state = that.state;

    if (isDefined(that.deliveryEta)) { // todo: this causes the null fields in "that" to not exist on the copied object
      order.deliveryEta = new Date(that.deliveryEta);
    }
    if (isDefined(that.orderDate)) {
      order.orderDate = new Date(that.orderDate);
    }
    if (isDefined(that.deliveredDate)) {
      order.deliveredDate = new Date(that.deliveredDate);
    }
    order.orderInfo = OrderInfo.copy(that.orderInfo);
    order.deliveryLocation = DeliveryLocation.copy(that.deliveryLocation);
    if (isDefined(that.completed)) {
      order.completed = that.completed;
    }
    return order;
  }

  constructor() {}
}
