import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.module';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ConfirmationModalModule } from '../confirmation-modal/confirmation-modal.module';

import { IncomingBatchesComponent } from './incoming-batches.component';

export { IncomingBatchesComponent } from './incoming-batches.component';

@NgModule({
  declarations: [
    IncomingBatchesComponent
  ],
  entryComponents: [
    ConfirmationModalComponent
  ],
  exports: [
    IncomingBatchesComponent
  ],
  imports: [
    ConfirmationModalModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [
    CacheService,
    MessageService
  ]
})
export class IncomingBatchesModule { }
