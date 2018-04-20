import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export const PLACE_ORDER_COMPONENT = 'PlaceOrderComponent';
export const ACCOUNT_INFO_COMPONENT = 'AccountInfoComponent';
export const INCOMING_BATCHES_COMPONENT = 'IncomingBatchesComponent';

@Component({
  selector: 'ms-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  // todo: this is not good!
  public placeOrderOrigin = PLACE_ORDER_COMPONENT; // todo: export these from their component so that they can be pulled in where needed?
  public accountInfoOrigin = ACCOUNT_INFO_COMPONENT;
  public incomingBatchesOrigin = INCOMING_BATCHES_COMPONENT;

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
