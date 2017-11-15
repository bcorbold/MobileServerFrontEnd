import { Inject, Injectable } from '@angular/core';

import { AppConfig } from '../../app.config';

@Injectable()
export class MessageService {

  constructor(@Inject(AppConfig) private config: AppConfig) { }

  sendMessage() {
    console.log(`Our backend url: ${this.config.backendUrl}`);
  }

}
