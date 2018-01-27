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
  loginMessage: string;
  isLoading = false;

  constructor(private router: Router, private accountService: AccountService) {}

  attemptLogin(): void {
    // this.username = 'admin';
    // this.password = 'a';

    this.loginMessage = '';
    this.isLoading = true;
    this.accountService.attemptLogin(this.username, this.password)
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['admin/desktop']);
      })
      .catch(() => {
        this.isLoading = false;
        if (this.username === 'anakin' && this.password === 'skywalker') {
          console.log('          ___________________________\n' +
            '         / It\'s over Anakin!        |\n' +
            '    ()   \\ I have the high ground!  |\n' +
            '---/||\\   ---------------------------\n' +
            '    /\\');
        }
        this.loginMessage = 'Invalid username or password';
      });
  }
}
