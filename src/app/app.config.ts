import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  getUrl = 'https://mobile-server-backend.herokuapp.com/userGet';
  postUrl = 'https://mobile-server-backend.herokuapp.com/userPost';
}
