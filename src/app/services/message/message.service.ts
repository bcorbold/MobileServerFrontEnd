// this is required since "Observable" doesn't include interval on import
import 'rxjs/add/observable/interval';

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConfig } from '../../app.config';
import { POCPostBody } from '../../core/json/poc-post-body';


@Injectable()
export class MessageService implements OnDestroy {

  private pollingSubscription: Subscription;

  backendUpdates: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(AppConfig) private config: AppConfig, private http: HttpClient) {
    this.pollingSubscription = Observable.interval(5000).subscribe(() => {
      this.http.get(this.config.getUrl).subscribe(data => {
      this.backendUpdates.next(data);
      });
    });
  }

  sendMessage(body: POCPostBody): Observable<Object> {
    return this.http.post(this.config.postUrl, body);
  }

  ngOnDestroy(): void {
    this.pollingSubscription.unsubscribe();
    this.pollingSubscription = undefined;
  }

}
