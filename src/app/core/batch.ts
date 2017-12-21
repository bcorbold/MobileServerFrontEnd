import { Order } from './order';

export class Batch {
  id: string;
  orders: [Order];
  batchEta: string;
  robotId: string;
}
