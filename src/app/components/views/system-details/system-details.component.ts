import { Component } from '@angular/core';

import { EnvironmentDetails } from '../../../core/environment-details';
import { RobotInfo } from '../../../core/robot-info';
import { MessageService } from '../../../services/message/message.service';
import { RobotStatus } from '../../../core/robot-status';

@Component({
  selector: 'ms-system-details',
  templateUrl: './system-details.component.html',
  styleUrls: ['./system-details.component.scss']
})
export class SystemDetailsComponent {

  _robotStatuses: RobotStatus[];
  get robotStatuses(): RobotStatus[] {
    return this._robotStatuses;
  }
  set robotStatuses(robotStatuses: RobotStatus[]) {
    this._robotStatuses = robotStatuses;
    this.onlineRobots = 0;
    this._robotStatuses.forEach(status => {
      if (status.isConnected) { this.onlineRobots++; }
    });
    console.log(this._robotStatuses);
  }

  configuredRobots: RobotInfo[];
  onlineRobots: number;

  constructor(private messageService: MessageService) {
    this.messageService.getEnvironmentDetails().then((environmentDetails: EnvironmentDetails) => {
      this.configuredRobots = environmentDetails.configuredRobots;
    });
    this.messageService.getRobotStatusUpdates()
      .then(robotStatuses => this.robotStatuses = robotStatuses)
      .catch(error => console.error(error)); // todo: should do something better than this
  }

}
