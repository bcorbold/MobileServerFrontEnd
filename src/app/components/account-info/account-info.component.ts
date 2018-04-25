import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { EnvironmentDetails } from '../../core/environment-details';
import { UserInfo } from '../../core/user-info';
import { CacheService } from '../../services/cache/cache.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { AccountInfoIdentifier } from '../view-identifiers';

@Component({
  selector: 'ms-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  private _isAdminView: boolean;
  private defaultUserInfo: UserInfo;

  @Output() userUpdate: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();
  @Output() isAdminViewChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() set isAdminView(isAdminView: boolean) {
    this._isAdminView = isAdminView;
    this.isAdminViewChange.emit(this._isAdminView);
  }
  get isAdminView() {
    return this._isAdminView;
  }

  environmentDetails: EnvironmentDetails;
  user: UserInfo;

  constructor(private router: Router, private cache: CacheService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.environmentDetails = new EnvironmentDetails();
    this.cache.getEnvironmentDetails()
      .then((envDetails) => this.environmentDetails = envDetails)
      .catch(err => {
        this.snackBar.open('Encountered an error while trying to fetch configuration information.', 'Dismiss', {
          duration: 30000,
          panelClass: 'mat-snack-bar-error'
        });
      });
    this.user = this.cache.user;
  }

  ngOnInit(): void {
    this.defaultUserInfo = new UserInfo(this.user);
  }

  updateAccountInfo(): void {
    const modalData = {origin: AccountInfoIdentifier};
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {data: modalData});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userUpdate.emit(this.user);
        this.defaultUserInfo = new UserInfo(this.user);
      }
    });
  }

  resetAccountInfo(): void {
    this.user = new UserInfo(this.defaultUserInfo);
  }

}
