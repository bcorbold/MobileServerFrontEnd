import { AddOn } from './add-on';

export class OrderOption {
  id: number;
  name: string;
  addOns: [AddOn];

  static coffee(): OrderOption {
    return {
      id: 1,
      name: 'Coffee',
      addOns: [
        AddOn.milk(),
        AddOn.cream(),
        AddOn.sugar(),
        AddOn.sweetener()
      ]
    };
  }

  static tea(): OrderOption {
    return {
      id: 2,
      name: 'Tea',
      addOns: [
        AddOn.milk(),
        AddOn.cream(),
        AddOn.sugar(),
        AddOn.sweetener(),
        AddOn.bagIn()
      ]
    };
  }

  static coke(): OrderOption {
    return {
      id: 3,
      name: 'Coke',
      addOns: [
        AddOn.ice()
      ]
    };
  }

}
