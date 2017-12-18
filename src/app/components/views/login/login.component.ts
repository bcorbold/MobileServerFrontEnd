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

  onLogin() {
    Cookies.set('ms-session-key', 'xxxxx-xxxxx-xxxxx-xxxxx');
    this.router.navigate(['desktop']);
  }
}
