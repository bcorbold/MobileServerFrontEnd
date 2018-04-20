import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { EnvironmentDetails } from '../../core/environment-details';
import { UserInfo } from '../../core/user-info';
import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

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

  constructor(private router: Router, private messageService: MessageService, private cache: CacheService, private dialog: MatDialog) {
    this.environmentDetails = new EnvironmentDetails();
    this.cache.getEnvironmentDetails().then((envDetails) => this.environmentDetails = envDetails);
    this.user = this.cache.user;
  }

  ngOnInit(): void {
    this.defaultUserInfo = new UserInfo(this.user);
  }

  updateAccountInfo(): void {
    const modalData = {origin: ConfirmationModalComponent.ACCOUNT_INFO_COMPONENT};
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
