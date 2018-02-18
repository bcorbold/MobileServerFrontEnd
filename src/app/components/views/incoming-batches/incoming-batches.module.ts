import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatChipsModule, MatIconModule, MatInputModule, MatTooltipModule } from '@angular/material';

import { CacheService } from '../../../services/cache/cache.service';
import { MessageService } from '../../../services/message/message.module';
import { IncomingBatchesComponent } from './incoming-batches.component';

export { IncomingBatchesComponent } from './incoming-batches.component';

@NgModule({
  declarations: [
    IncomingBatchesComponent
  ],
  exports: [
    IncomingBatchesComponent
  ],
  imports: [
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
