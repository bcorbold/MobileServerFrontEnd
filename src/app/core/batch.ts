import { Order } from './order';

export class Batch {
  id: string;
  state: string;
  orders: Order[];
  robotArrived: boolean; // todo: remove?
  ready?: boolean;
}
