import { Component } from '@angular/core';

import { EnvironmentDetails } from '../../../core/environment-details';
import { RobotInfo } from '../../../core/robot-info';
import { RobotStatus } from '../../../core/robot-status';
import { CacheService } from '../../../services/cache/cache.service';
import { MessageService } from '../../../services/message/message.service';
import { SystemDetails } from '../../../core/system-details';

@Component({
  selector: 'ms-system-details',
  templateUrl: './system-details.component.html',
  styleUrls: ['./system-details.component.scss']
})
export class SystemDetailsComponent {

  systemDetails: SystemDetails;
  configuredRobots: RobotInfo[];

  constructor(private messageService: MessageService, private cache: CacheService) {
    this.cache.getEnvironmentDetails().then((environmentDetails: EnvironmentDetails) => {
      this.configuredRobots = environmentDetails.configuredRobots;
    });

    this.cache.getSystemDetails().subscribe((systemDetails: SystemDetails) => this.systemDetails = systemDetails);
  }

}
