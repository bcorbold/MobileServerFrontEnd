import * as _ from 'lodash';

import { Component } from '@angular/core';

import { User } from './core/user';

@Component({
  selector: 'ms-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {

  user: User = {
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

  handleUserInfoChange(newUser: User): void {
    this.user = _.defaultsDeep({}, newUser);
  }

  changeView(): void {
    this.isAdminView = !this.isAdminView;
  }

}
