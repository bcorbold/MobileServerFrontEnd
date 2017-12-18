import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as Cookies from 'js-cookie';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {}

  user = {
    username: '',
    password: ''
  };

  onLogin() {
    Cookies.set('ms-session-key', 'xxxxx-xxxxx-xxxxx-xxxxx');
    if (this.user.username === 'admin' && this.user.password === 'a') {
      this.router.navigate(['admin/desktop']);
    } else {
      this.router.navigate(['user/desktop']);
    }
  }
}
