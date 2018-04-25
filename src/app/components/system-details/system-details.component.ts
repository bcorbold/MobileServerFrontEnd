import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
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

  constructor(private messageService: MessageService, private cache: CacheService, private snackBar: MatSnackBar) {
    this.cache.getEnvironmentDetails()
      .then((environmentDetails: EnvironmentDetails) => {
        this.configuredRobots = environmentDetails.configuredRobots;
      })
      .catch(err => {
        this.snackBar.open('Encountered an error while trying to fetch configuration information.', 'Dismiss', {
          duration: 30000,
          panelClass: 'mat-snack-bar-error'
        });
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
