import { Component, OnInit } from '@angular/core';

import { User } from '../../core/user';

@Component({
  selector: 'ms-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  userInfo: any = {};

  ngOnInit(): void {
    this.userInfo = {
      id: 123456,
      username: 'bradencorbold@gmail.com',
      firstName: 'Braden',
      lastName: 'Corbold',
      currentPermissions: 'User',
      defaultPermissions: 'User',
      deskLocation: '1st floor, section A, desk 3',
      locale: 'en-GB'
    };
  }

}
