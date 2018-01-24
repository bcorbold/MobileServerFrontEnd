import { Component } from '@angular/core';

import { EnvironmentDetails } from '../../../core/environment-details';
import { RobotInfo } from '../../../core/robot-info';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'ms-system-details',
  templateUrl: './system-details.component.html',
  styleUrls: ['./system-details.component.scss']
})
export class SystemDetailsComponent {

  configuredRobots: RobotInfo[];

  constructor(private messageService: MessageService) {
    this.messageService.getEnvironmentDetails().then((environmentDetails: EnvironmentDetails) => {
      this.configuredRobots = environmentDetails.configuredRobots;
    });
  }

}
