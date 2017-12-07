import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
