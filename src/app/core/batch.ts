import { Order } from './order';
import { RobotInfo } from './robot-info';

export class Batch {
  id: string;
  orders: [Order];
  batchEta: string;
  assignedRobot: RobotInfo;
  state: string;
  ready?: boolean;
}
