import { AddOn } from './add-on';

export class OrderOption {
  id: number;
  name: string;
  addOns: AddOn[];
  description: string;

  static copy(that: OrderOption): OrderOption {
    const orderOption = new OrderOption();
    orderOption.id = that.id;
    orderOption.name = that.name;
    orderOption.addOns = [];
    that.addOns.forEach(addOn => {
      orderOption.addOns.push(AddOn.copy(addOn));
    });
    orderOption.description = that.description;
    return orderOption;
  }

  constructor() {}

}
