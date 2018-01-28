import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatChipsModule, MatIconModule, MatInputModule, MatTooltipModule } from '@angular/material';

import { MessageModule, MessageService } from '../../../services/message/message.module';
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
    MatTooltipModule,
    MessageModule
  ],
  providers: [
    MessageService
  ]
})
export class IncomingBatchesModule { }
