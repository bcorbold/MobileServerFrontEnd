import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationModalComponent, INCOMING_BATCHES_COMPONENT, PLACE_ORDER_COMPONENT, ACCOUNT_INFO_COMPONENT } from './confirmation-modal.component';

export { ConfirmationModalComponent, ACCOUNT_INFO_COMPONENT, INCOMING_BATCHES_COMPONENT, PLACE_ORDER_COMPONENT } from './confirmation-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    ConfirmationModalComponent
  ],
  exports: [
    ConfirmationModalComponent
  ]
})
export class ConfirmationModalModule { }
