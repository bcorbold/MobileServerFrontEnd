import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { DesktopComponent } from './components/desktop/desktop.component';
import { LoginComponent } from './components/login/login.component';

@Injectable()
export class AppConfig {
  getUrl = 'https://mobile-server-backend.herokuapp.com/userGet';
  postUrl = 'https://mobile-server-backend.herokuapp.com/userPost';
  appRoutes: Routes = [
    { path: 'desktop', component: DesktopComponent },
    { path: 'login', component: LoginComponent },
    { path: '',   redirectTo: 'login', pathMatch: 'full' }
  ];
}
