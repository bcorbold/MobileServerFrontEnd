export class AddOn {
  id: number;
  name: string;
  type: string;

  static copy(that: AddOn): AddOn {
    const addOn = new AddOn();
    addOn.name = that.name;
    addOn.type = that.type;
    return addOn;
  }

  constructor() {}

}
