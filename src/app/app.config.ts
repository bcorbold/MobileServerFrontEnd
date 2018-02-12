import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  // todo: would be nice to be able to switch these based on the build
  // backendUrl = 'http://localhost:8080/ui/'; // develop
  backendUrl = 'https://mobile-server-backend.herokuapp.com/ui/'; // production
}
