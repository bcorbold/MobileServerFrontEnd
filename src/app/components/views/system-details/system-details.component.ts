import { Component } from '@angular/core';

import { EnvironmentDetails } from '../../../core/environment-details';
import { RobotInfo } from '../../../core/robot-info';
import { RobotStatus } from '../../../core/robot-status';
import { CacheService } from '../../../services/cache/cache.service';
import { MessageService } from '../../../services/message/message.service';

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
  }

  configuredRobots: RobotInfo[];
  onlineRobots: number;

  constructor(private messageService: MessageService, private cache: CacheService) {
    this.cache.getEnvironmentDetails().then((environmentDetails: EnvironmentDetails) => {
      this.configuredRobots = environmentDetails.configuredRobots;
    });
    this.messageService.getRobotStatusUpdates()
      .then(robotStatuses => this.robotStatuses = robotStatuses)
      .catch(error => console.error(error)); // todo: should do something better than this
  }

}
