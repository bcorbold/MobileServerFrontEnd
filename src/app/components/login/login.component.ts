import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';

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

  constructor(private messageService: MessageService, private cache: CacheService,
              private router: Router, private snackBar: MatSnackBar) {}

  attemptLogin(): void {
    this.loginMessage = '';
    this.isLoading = true;

    if (this.username === 'anakin' && this.password === 'skywalker') {
      console.log('          ___________________________\n' +
        '         / It\'s over Anakin!        |\n' +
        '    ()   \\ I have the high ground!  |\n' +
        '---/||\\   ---------------------------\n' +
        '    /\\');
    }

    this.messageService.login(this.username, this.password)
      .then(() => {
        this.isLoading = false;
        if (this.cache.user.adminEnabled) {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['user']);
        }
      })
      .catch((error) => {
        this.isLoading = false;
        this.loginMessage = 'Incorrect username or password. Try again.';
        if (error) {
          this.snackBar.open('Encountered an error while trying to login.', 'Dismiss', {
            duration: 30000,
            panelClass: 'mat-snack-bar-error'
          });
        }
      });
  }
}
