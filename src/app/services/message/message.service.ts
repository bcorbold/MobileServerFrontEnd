// this is required since "Observable" doesn't include interval on import
import 'rxjs/add/observable/interval';

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConfig } from '../../app.config';

@Injectable()
export class MessageService implements OnDestroy {

  private pollingSubscription: Subscription;

  backendUpdates: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(AppConfig) private config: AppConfig, private http: HttpClient) {
    this.pollingSubscription = Observable.interval(5000).subscribe(() => {
      this.http.get(this.config.getUrl).subscribe((data: any) => {
      this.backendUpdates.next(data);
      });
    });
  }

  ngOnDestroy(): void {
    this.pollingSubscription.unsubscribe();
    this.pollingSubscription = undefined;
  }

}
