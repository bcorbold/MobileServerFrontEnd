import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { AccountInfoIdentifier, IncomingBatchesIdentifier, PlaceOrderIdentifier } from '../view-identifiers';

@Component({
  selector: 'ms-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  public accountInfoId = AccountInfoIdentifier;
  public incomingBatchesId = IncomingBatchesIdentifier;
  public placeOrderId = PlaceOrderIdentifier;

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
