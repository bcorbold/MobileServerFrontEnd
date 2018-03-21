import { Order } from './order';
import { RobotInfo } from './robot-info';

export class Batch {
  id: string;
  state: string;
  orders: Order[];
  batchEta: string;
  robotArrived: boolean;
  ready?: boolean;
}
