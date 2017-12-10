import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatInputModule, MatSlideToggleModule } from '@angular/material';

import { MessageModule, MessageService } from '../../services/message/message.module';
import { PageSelectorModule } from '../page-selector/page-selector.module';
import { OrderHistoryComponent } from './order-history.component';

export { OrderHistoryComponent } from './order-history.component';

@NgModule({
  declarations: [
    OrderHistoryComponent
  ],
  exports: [
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MessageModule,
    // PageSelectorModule
  ],
  providers: [
    MessageService
  ]
})
export class OrderHistoryModule { }
