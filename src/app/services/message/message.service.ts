import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AppConfig } from '../../app.config';

@Injectable()
export class MessageService implements OnDestroy {
  getPoller: Observable<any>; // todo(braden): Need to make this typed

  constructor(@Inject(AppConfig) private config: AppConfig) {
    this.getPoller = Observable.interval(5000);

    this.getPoller.subscribe(() => {
      console.log('Sending GET request to backend');
      // todo: make GET request
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
