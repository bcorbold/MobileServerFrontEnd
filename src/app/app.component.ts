import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Cookies from 'js-cookie';

import { Component } from '@angular/core';

@Component({
  selector: 'ms-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    window.addEventListener('beforeunload', () => {
      Cookies.remove('ms-session-key');
    });

    this.router.navigate(['']);
  }
}
