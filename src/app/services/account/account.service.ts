import { Inject, Injectable, OnDestroy } from '@angular/core';

import { AppConfig } from '../../app.config';
import { UserInfo } from '../../core/user-info';
import { MessageService } from '../message/message.service';

@Injectable()
export class AccountService implements OnDestroy {
  private _userInfo: UserInfo;
  set userInfo(user: UserInfo) { this._userInfo = user; }
  get userInfo() { return this._userInfo; }

  constructor(@Inject(AppConfig) private config: AppConfig, private messageService: MessageService) {}

  ngOnDestroy(): void {}

  attemptLogin(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.messageService.login(username, password)
        .then(userInfo => {
          this.userInfo = userInfo;
          resolve();
        })
        .catch(() => {
          console.error('UserInfo authentication failed...');
          reject();
        });
    });
  }

  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.messageService.logout()
        .then(() => {
          this.userInfo = undefined;
          resolve();
        })
        .catch(error => reject(error));
    });
  }

  updateAccountInfo(updatedUserInfo: UserInfo): Promise<void> {
    return this.messageService.updateAccountInfo(updatedUserInfo);
  }

}
