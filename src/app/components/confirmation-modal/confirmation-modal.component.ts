import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'ms-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  static PLACE_ORDER_COMPONENT = 'PlaceOrderComponent';
  static ACCOUNT_INFO_COMPONENT = 'AccountInfoComponent';
  static INCOMING_BATCHES_COMPONENT = 'IncomingBatchesComponent';

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
