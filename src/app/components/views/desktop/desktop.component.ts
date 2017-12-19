import * as Cookies from 'js-cookie';
import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';

import { UserInfo } from '../../../core/user-info';
import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'ms-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {
  userInfo: UserInfo;

  user: UserInfo = {
    username: 'bradencorbold@gmail.com',
    firstName: 'Braden',
    lastName: 'Corbold',
    adminEnabled: true,
    defaultDeliveryLocation: {
      id: 1,
      name: '1st floor, section A, desk 3'
    },
    defaultView: 'user',
    locale: 'en_GB'
  };
  isAdminView = this.user.defaultView === 'bartender';

  constructor(private accountService: AccountService) {
    this.userInfo = this.accountService.userInfo;
  }

  handleUserInfoChange(newUser: UserInfo): void {
    this.user = _.defaultsDeep({}, newUser);
  }

  changeView(): void {
    this.isAdminView = !this.isAdminView;
  }

  ngOnInit() {
    console.log(Cookies.get('ms-session-key'));
  }

}
