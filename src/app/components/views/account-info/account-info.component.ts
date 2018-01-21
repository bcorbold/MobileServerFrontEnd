import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { EnvironmentDetails } from '../../../core/environment-details';
import { UserInfo } from '../../../core/user-info';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'ms-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  @Input() user: UserInfo;
  @Input() isAdminView: boolean;
  @Output() userUpdate: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();
  @Output() switchView: EventEmitter<void> = new EventEmitter<void>();

  environmentDetails: EnvironmentDetails;

  private defaultUserInfo: UserInfo;

  constructor(private messageService: MessageService) {
    this.environmentDetails = new EnvironmentDetails();

    this.messageService.getEnvironmentDetails()
      .then((envDetails) => {
        this.environmentDetails = envDetails;
        console.log(this.environmentDetails);
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

  resetAccountInfo(): void {
    this.user = new UserInfo(this.defaultUserInfo);
  }

}
