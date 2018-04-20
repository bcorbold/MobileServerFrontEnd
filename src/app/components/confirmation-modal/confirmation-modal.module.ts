import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationModalComponent } from './confirmation-modal.component';

export { ConfirmationModalComponent } from './confirmation-modal.component';

@NgModule({
  imports: [
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
