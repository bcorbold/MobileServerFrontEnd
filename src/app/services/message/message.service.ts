import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { PostBody } from './post-body';

import { AppConfig } from '../../app.config';

@Injectable()
export class MessageService implements OnDestroy {
  backendUpdates: EventEmitter<any> = new EventEmitter<any>();

  private getPoller: Observable<any>;

  constructor(@Inject(AppConfig) private config: AppConfig, private http: HttpClient) {
    this.getPoller = Observable.interval(5000);
    this.getPoller.subscribe(() => {
      this.http.get(this.config.getUrl).subscribe(data => {
        this.backendUpdates.next(data);
      });
    });
  }

  // todo(braden): Make this typed
  sendMessage(body: PostBody) {
    return this.http.post(this.config.postUrl, body);
  }

  ngOnDestroy(): void {
    // this.getPoller.unsubscribe(); //todo: Figure out whats going wrong with these observable imports
    this.getPoller = undefined;
  }

}
