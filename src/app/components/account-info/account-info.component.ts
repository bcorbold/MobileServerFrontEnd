import { Component, OnInit } from '@angular/core';

import { User } from '../../core/user';

@Component({
  selector: 'ms-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  userInfo: User = new User();

  ngOnInit(): void {
    this.userInfo = {
      id: 123456,
      username: 'bcorbold',
      firstName: 'Braden',
      lastName: 'Corbold',
      currentPermissions: 'User',
      defaultPermissions: 'User',
      deskLocation: '1sr floor, section A, desk 3',
      locale: 'en-GB'
    };
  }

}
