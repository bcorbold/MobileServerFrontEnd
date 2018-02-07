import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AccountService } from '../../../services/account/account.service';
import { MessageService } from '../../../services/message/message.service';
import { PlaceOrderComponent } from './place-order.component';

export { PlaceOrderComponent } from './place-order.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
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
