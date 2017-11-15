import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AppConfig } from '../../app.config';

@Injectable()
export class MessageService implements OnDestroy {
  getPoller: Observable<any>; // todo(braden): Need to make this typed

  constructor(@Inject(AppConfig) private config: AppConfig) {
    this.getPoller = Observable
      .interval(5000)
      .flatMap(() => {
        return ['hi'];
      });

    this.getPoller.subscribe((message) => {
      console.log(message.toString());
    });
  }

  ngOnDestroy(): void {
    this.getPoller.unsubscribe();
    this.getPoller = undefined;
  }

  sendMessage() {
    console.log(`Our backend url: ${this.config.backendUrl}`);
  }

}
