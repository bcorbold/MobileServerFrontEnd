export class DeliveryLocation {
  id: number;
  name: string;

  static copy(that: DeliveryLocation): DeliveryLocation {
    const deliveryLocation: DeliveryLocation = new DeliveryLocation();

    deliveryLocation.id = that.id;
    deliveryLocation.name = that.name;

    return deliveryLocation;
  }

  constructor() {}

}
