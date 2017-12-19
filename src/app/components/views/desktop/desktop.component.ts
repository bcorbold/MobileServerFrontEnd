import { Component } from '@angular/core';

import { UserInfo } from '../../../core/user-info';
import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'ms-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent {
  userInfo: UserInfo;
  isAdminView = false;

  constructor(private accountService: AccountService) {
    this.userInfo = this.accountService.userInfo;
    this.isAdminView = this.userInfo.defaultView === 'bartender';
  }

  handleUserInfoChange(updatedUserInfo: UserInfo): void {
    this.accountService.updateAccountInfo(updatedUserInfo)
      .then(user => this.userInfo = user)
      .catch(() => console.error('User account info could not be updated'));
  }

  changeView(): void {
    this.isAdminView = !this.isAdminView;
  }

}
