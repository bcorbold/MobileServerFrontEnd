import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { EnvironmentDetails } from '../../../core/environment-details';
import { UserInfo } from '../../../core/user-info';
import { AccountService } from '../../../services/account/account.service';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'ms-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  private _isAdminView: boolean;
  private defaultUserInfo: UserInfo;
  environmentDetails: EnvironmentDetails;

  @Output() userUpdate: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();
  @Output() isAdminViewChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() user: UserInfo;
  @Input() set isAdminView(isAdminView: boolean) {
    this._isAdminView = isAdminView;
    this.isAdminViewChange.emit(this._isAdminView);
  }
  get isAdminView() {
    return this._isAdminView;
  }

  constructor(private router: Router, private messageService: MessageService, private accountService: AccountService) {
    this.environmentDetails = new EnvironmentDetails();
    this.messageService.getEnvironmentDetails()
      .then((envDetails) => {
        this.environmentDetails = envDetails;
      })
      .catch(error => console.error(error));
  }

  ngOnInit(): void {
    this.defaultUserInfo = new UserInfo(this.user);
  }

  updateAccountInfo(): void {
    this.userUpdate.emit(this.user);
    this.defaultUserInfo = new UserInfo(this.user);
  }

  logout(): void {
    this.accountService.logout()
      .then(() => this.router.navigate(['/']))
      .catch(error => console.error(error)); //  todo: how do we want to handle this...
  }

  resetAccountInfo(): void {
    this.user = new UserInfo(this.defaultUserInfo);
  }

}
