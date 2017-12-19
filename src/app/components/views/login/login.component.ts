import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private router: Router, private accountService: AccountService) {}

  attemptLogin() {
    this.accountService.attemptLogin(this.username, this.password)
      .then(() => this.router.navigate(['admin/desktop']))
      .catch(() => console.log('Invalid username or password'));
  }
}
