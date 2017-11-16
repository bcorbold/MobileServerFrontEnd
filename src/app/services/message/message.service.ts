import { HttpClient } from '@angular/common/http';
import {EventEmitter, Inject, Injectable, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AppConfig } from '../../app.config';

@Injectable()
export class MessageService implements OnDestroy {
  backendUpdates: EventEmitter<any> = new EventEmitter<any>();

  private getPoller: Observable<any>;

  constructor(@Inject(AppConfig) private config: AppConfig, private http: HttpClient) {
    const postBody = {
      'led1State': 'true',
      'led2State': 'false',
      'userInfo': {
        'id': '4c31bbb5-2a66-48ca-9b5c-8c7d04c8fcf5',
        'name': 'Bob'
      }
    };

    this.http.post(this.config.postUrl, postBody).subscribe(data => {
      console.log(data);
    });

    // this.getPoller = Observable.interval(5000);
    // this.getPoller.subscribe(() => {
    //   this.http.get(this.config.getUrl).subscribe(data => {
    //     this.backendUpdates.next(data);
    //   });
    // });
  }

  // todo(braden): Make this typed
  sendMessage(body: any) {
    return this.http.post(this.config.postUrl, body);
  }

  ngOnDestroy(): void {
    // this.getPoller.unsubscribe(); //todo: Figure out whats going wrong with these observable imports
    this.getPoller = undefined;
  }

}
