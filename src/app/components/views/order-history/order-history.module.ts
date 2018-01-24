import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatChipsModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { MessageModule, MessageService } from '../../../services/message/message.module';
import { DateTimeFormatterModule } from '../../core/date-time-formatter/date-time-formatter.module';
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
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MessageModule
  ],
  providers: [
    MessageService
  ]
})
export class OrderHistoryModule { }
