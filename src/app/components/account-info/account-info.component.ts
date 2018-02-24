import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { EnvironmentDetails } from '../../core/environment-details';
import { UserInfo } from '../../core/user-info';
import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';

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

  constructor(private router: Router, private messageService: MessageService, private cache: CacheService) {
    this.environmentDetails = new EnvironmentDetails();
    this.cache.getEnvironmentDetails().then((envDetails) => this.environmentDetails = envDetails);
    this.user = this.cache.user;
  }

  ngOnInit(): void {
    this.defaultUserInfo = new UserInfo(this.user);
  }

  updateAccountInfo(): void {
    this.userUpdate.emit(this.user);
    this.defaultUserInfo = new UserInfo(this.user);
  }

  logout(): void {
    this.messageService.logout().then(() => this.router.navigate(['/']));
  }

  resetAccountInfo(): void {
    this.user = new UserInfo(this.defaultUserInfo);
  }

}
