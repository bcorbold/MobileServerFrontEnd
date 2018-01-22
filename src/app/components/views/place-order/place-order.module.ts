import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatInputModule, MatSelectModule } from '@angular/material';

import { MessageService } from '../../../services/message/message.service';
import { PlaceOrderComponent } from './place-order.component';
import { AccountService } from '../../../services/account/account.service';

export { PlaceOrderComponent } from './place-order.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    PlaceOrderComponent
  ],
  exports: [
    PlaceOrderComponent
  ],
  providers: [
    AccountService,
    MessageService
  ]
})
export class PlaceOrderModule { }
