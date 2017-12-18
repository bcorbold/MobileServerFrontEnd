import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MessageModule, MessageService } from '../../../services/message/message.module';
import { PageSelectorModule } from '../../core/page-selector/page-selector.module';

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
    BrowserAnimationsModule, // todo: shouldn't have to import this
    FlexLayoutModule,
    MessageModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    PageSelectorModule
  ],
  providers: [
    MessageService
  ]
})
export class IncomingBatchesModule { }
