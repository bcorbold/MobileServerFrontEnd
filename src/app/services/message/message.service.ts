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
import { DeliveryLocation } from '../../core/delivery-location';
import { OrderOption } from '../../core/order-option';

@Injectable()
export class MessageService implements OnDestroy {

  private pollingSubscription: Subscription;
  private sessionKey: string;
  private user: UserInfo;
  private environmentDetails: {deliveryLocations: DeliveryLocation[], locales: string[], orderOptions: OrderOption[]};

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

  private fetchEnvironmentDetails(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.config.devUrl + 'getEnvironmentDetails', {username: this.user.username, sessionKey: this.sessionKey})
        .subscribe(
          (response: any) => {
            console.log(response);
            resolve(response);
          },
          error => reject(error)
        );
    });
  }

  getEnvironmentDetails(): Promise<any> {
    if (isDefined(this.environmentDetails)) {
      return new Promise<any>(resolve => { resolve(this.environmentDetails); });
    } else {
      return this.fetchEnvironmentDetails();
    }
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

  // todo: needs to be made not a mock
  updateAccountInfo(user: UserInfo): Promise<UserInfo> {
    return new Promise<UserInfo>((resolve, reject) => {
      resolve(user);
    });
  }

}
