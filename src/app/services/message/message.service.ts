// this is required since "Observable" doesn't include interval on import
import 'rxjs/add/observable/interval';

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConfig } from '../../app.config';
import { isDefined } from '../../core/is-defined';
import { Order } from '../../core/order';
import { UserInfo } from '../../core/user-info';

@Injectable()
export class MessageService implements OnDestroy {

  private pollingSubscription: Subscription;
  private sessionKey: string;
  private user: UserInfo;

  backendUpdates: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(AppConfig) private config: AppConfig, private http: HttpClient) {

    // todo: should only poll once a component wants to subscribe to it
    this.pollingSubscription = Observable.interval(5000).subscribe(() => {
      // todo: commented this out to not hit the backend so hard with requests while testing
      // this.http.get(this.config.getUrl).subscribe((data: any) => {
      //   this.backendUpdates.next(data);
      // });
    });
  }

  ngOnDestroy(): void {
    this.pollingSubscription.unsubscribe();
    this.pollingSubscription = undefined;
  }

  login(username: string, password: string): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.devUrl + 'login', {username: username, password: password})
        .subscribe(
          (response: any) => {
                  // console.log(response);
                  this.sessionKey = response.sessionKey;
                  this.user = response.userInfo;
                  resolve(response.userInfo);
                },
          (error: any) => {
                  // console.log(error);
                  reject(error);
                }
        );
    });
  }

  updateAccountInfo(user: UserInfo): Promise<UserInfo> {
    return new Promise<UserInfo>((resolve, reject) => {
      resolve(user);
    });
  }

  getOrderHistory(): Promise<Order[]> {
    return new Promise<Order[]>((resolve, reject) => {
      this.http.post(this.config.devUrl + 'getOrderHistory', {username: this.user.username, sessionKey: this.sessionKey})
        .subscribe(
          (response: any) => {
                  // console.log(response);
                  const orderHistory: Order[] = [];
                  response.orderHistory.forEach(order => {
                      if (isDefined(order.deliveryEta)) {
                        order.deliveryEta = new Date(order.deliveryEta);
                      }
                      if (isDefined(order.orderDate)) {
                        order.orderDate = new Date(order.orderDate);
                      }
                      if (isDefined(order.deliveredDate)) {
                        order.deliveredDate = new Date(order.deliveredDate);
                      }
                      orderHistory.push(order);
                  });

                  resolve(orderHistory);
                },
          error => {
                  // console.log(error);
                  reject(error);
                }
        );
    });
  }

}
