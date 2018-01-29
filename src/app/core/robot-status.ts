import { RobotInfo } from './robot-info';

export class RobotStatus {
  robotInfo: RobotInfo;
  isConnected: boolean;
  robotError: {id: number, message: string};
}
