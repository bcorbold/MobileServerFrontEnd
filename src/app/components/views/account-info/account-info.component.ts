import * as _ from 'lodash';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UserInfo } from '../../../core/user-info';

@Component({
  selector: 'ms-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  @Input() user: UserInfo;
  @Output() userUpdate: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();
  @Output() switchView: EventEmitter<void> = new EventEmitter<void>();

  private defaultUserInfo: UserInfo;

  ngOnInit(): void {
    this.defaultUserInfo = _.defaultsDeep({}, this.user);
  }

}
