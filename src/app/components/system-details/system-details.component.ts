import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EnvironmentDetails } from '../../core/environment-details';
import { isDefined } from '../../core/is-defined';
import { RobotInfo } from '../../core/robot-info';
import { SystemDetails } from '../../core/system-details';
import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'ms-system-details',
  templateUrl: './system-details.component.html',
  styleUrls: ['./system-details.component.scss']
})
export class SystemDetailsComponent implements OnDestroy {

  private systemDetailsSubscription: Subscription;

  systemDetails: SystemDetails;
  configuredRobots: RobotInfo[];

  constructor(private messageService: MessageService, private cache: CacheService) {
    this.cache.getEnvironmentDetails().then((environmentDetails: EnvironmentDetails) => {
      this.configuredRobots = environmentDetails.configuredRobots;
    });

    this.systemDetailsSubscription = this.cache.getSystemDetails().subscribe(
      (systemDetails: SystemDetails) => this.systemDetails = systemDetails
    );
  }

  ngOnDestroy(): void {
    if (isDefined(this.systemDetailsSubscription)) {
      this.systemDetailsSubscription.unsubscribe();
      this.systemDetailsSubscription = undefined;
      this.cache.unsubscribeFromSystemDetailsUpdates();
    }
  }

}
