import * as _ from 'lodash';

import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Batch } from '../../../core/batch';
import { isDefined } from '../../../core/is-defined';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'ms-incoming-batches',
  styleUrls: ['incoming-batches.component.scss'],
  templateUrl: './incoming-batches.component.html'
})
export class IncomingBatchesComponent implements OnDestroy {

  batches: Batch[] = [];
  incomingBatchSubscription: Subscription;

  constructor(private messageService: MessageService) {
    this.incomingBatchSubscription = this.messageService.getIncomingBatches().subscribe(
      (batches: Batch[]) => {
        // this is needed so that bartender can keep track of finished drinks after an update
        this.batches.forEach(batch => {
          const i = _.findIndex(batches, {id: batch.id});
          if (i !== -1) {
            batches[i] =_.defaultsDeep(batches[i], batch);
          }
        });
        this.batches = batches;
      },
      error => console.error(error)
    );
  }

  ngOnDestroy(): void {
    if (isDefined(this.incomingBatchSubscription)) {
      this.incomingBatchSubscription.unsubscribe();
      this.incomingBatchSubscription = undefined;
    }
  }

}
