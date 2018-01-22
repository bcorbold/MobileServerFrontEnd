import * as _ from 'lodash';

import { OrderOption } from './order-option';

export class OrderInfo {
  orderOption: OrderOption;
  selectedAddOns: {key: string, value: boolean | number | string}[]; // key=addOnTag, val=value

  static copy(that: OrderInfo): OrderInfo {
    return new OrderInfo(that.orderOption, that.selectedAddOns);
  }

  constructor(orderOption: OrderOption, selectedAddOns: {key: string, value: boolean | number | string}[]) {
    this.orderOption = OrderOption.copy(orderOption);
    this.selectedAddOns = [];
    selectedAddOns.forEach(addOn => {
      this.selectedAddOns.push(_.defaultsDeep({}, addOn));
    });
  }

}
