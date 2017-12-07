import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  loginSuccess = false;

  constructor(private router: Router) {}

  newSessionKey(sessionKey: string) {
    this.loginSuccess = true;
    this.router.navigate(['/desktop']);
  }

  ngOnDestroy() {
    this.router.navigate(['/login']);
  }
}
