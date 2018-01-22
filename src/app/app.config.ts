import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { DesktopComponent } from './components/views/desktop/desktop.component';
import { LoginComponent } from './components/views/login/login.component';

@Injectable()
export class AppConfig {
  // todo: would be nice to be able to switch these based on the build
  backendUrl = 'http://localhost:8080/ui/'; // develop
  // backendUrl = 'https://mobile-server-backend.herokuapp.com/ui/'; // production
}
