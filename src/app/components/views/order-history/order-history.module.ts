import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { MessageModule, MessageService } from '../../../services/message/message.module';
import { DateTimeFormatterModule } from '../../core/date-time-formatter/date-time-formatter.module';
import { PageSelectorModule } from '../../core/page-selector/page-selector.module';

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
    DateTimeFormatterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MessageModule,
    PageSelectorModule
  ],
  providers: [
    MessageService
  ]
})
export class OrderHistoryModule { }
