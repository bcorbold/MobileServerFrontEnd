import * as _ from 'lodash';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { User } from '../../../core/user';

@Component({
  selector: 'ms-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  @Input() user: User;
  @Output() userUpdate: EventEmitter<User> = new EventEmitter<User>();
  @Output() switchView: EventEmitter<void> = new EventEmitter<void>();

  private defaultUserInfo: User;

  ngOnInit(): void {
    this.defaultUserInfo = _.defaultsDeep({}, this.user);
  }

  updateAccountInfo(): void {
    this.userUpdate.emit(this.user);
    this.defaultUserInfo = _.defaultsDeep({}, this.user);
  }

  resetAccountInfo(): void {
    this.user = _.defaultsDeep({}, this.defaultUserInfo);
  }
}
