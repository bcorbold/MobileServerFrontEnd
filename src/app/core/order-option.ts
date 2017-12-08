import { AddOn } from './add-on';

export class OrderOption {
  id: number;
  name: string;
  addOns: [AddOn];
}
