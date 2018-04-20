import * as _ from 'lodash';

import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Batch } from '../../core/batch';
import { EnvironmentDetails } from '../../core/environment-details';
import { isDefined } from '../../core/is-defined';
import { BatchStates } from '../../core/lists/batch-states';
import { Order } from '../../core/order';
import { RobotInfo } from '../../core/robot-info';
import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';
import { ConfirmationModalComponent, INCOMING_BATCHES_COMPONENT } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'ms-incoming-batches',
  styleUrls: ['incoming-batches.component.scss'],
  templateUrl: './incoming-batches.component.html'
})
export class IncomingBatchesComponent implements OnDestroy { // todo: getting an error when clicking on an order to signify that it's done
  protected BatchStates = BatchStates;

  batches: Batch[] = [];
  incomingBatchSubscription: Subscription;
  configuredRobots: RobotInfo[];

  constructor(private messageService: MessageService, private cache: CacheService, private dialog: MatDialog) {
    this.incomingBatchSubscription = this.cache.getIncomingBatches().subscribe( // todo: error handling?
      (batches: Batch[]) => {
        // this is needed so that bartender can keep track of finished drinks after an update
        this.batches.forEach(batch => {
          const i = _.findIndex(batches, {id: batch.id});
          if (i !== -1) {
            batches[i] = _.defaultsDeep(batches[i], batch);
          }
        });
        this.batches = batches;
      }
    );
    this.cache.getEnvironmentDetails().then((envDetails: EnvironmentDetails) => {
      this.configuredRobots = envDetails.configuredRobots;
    });
  }

  updateOrderStatus(order: Order, batch: Batch) {
    order.ready = !order.ready;
    let isBatchReady = true;
    batch.orders.forEach(o => isBatchReady = isBatchReady && o.ready);
    batch.ready = isBatchReady;
  }

  sendBatch(batch: Batch) {
    const modalData = {
      origin: INCOMING_BATCHES_COMPONENT,
      batch: batch
    };
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {data: modalData});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.messageService.sendBatch(batch);
      }
    });
  }

  ngOnDestroy(): void {
    if (isDefined(this.incomingBatchSubscription)) {
      this.incomingBatchSubscription.unsubscribe();
      this.incomingBatchSubscription = undefined;
      this.cache.unsubscribeFromBatchUpdates();
    }
  }

}
