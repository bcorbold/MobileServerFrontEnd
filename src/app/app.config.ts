import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { DesktopComponent } from './components/views/desktop/desktop.component';
import { LoginComponent } from './components/views/login/login.component';

@Injectable()
export class AppConfig {
  getUrl = 'https://mobile-server-backend.herokuapp.com/userGet'; // todo: no longer applies
  postUrl = 'https://mobile-server-backend.herokuapp.com/userPost';

  devUrl = 'http://localhost:8080/ui/';
  prodUrl = 'https://mobile-server-backend.herokuapp.com/ui/';
}
