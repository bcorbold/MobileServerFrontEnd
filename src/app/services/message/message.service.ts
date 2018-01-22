// this is required since "Observable" doesn't include interval on import
import 'rxjs/add/observable/interval';

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConfig } from '../../app.config';
import { DeliveryLocation } from '../../core/delivery-location';
import { EnvironmentDetails } from '../../core/environment-details';
import { isDefined } from '../../core/is-defined';
import { Order } from '../../core/order';
import { OrderInfo } from '../../core/order-info';
import { OrderOption } from '../../core/order-option';
import { UserInfo } from '../../core/user-info';

@Injectable()
export class MessageService implements OnDestroy {

  private pollingSubscription: Subscription;
  private sessionKey: string;
  private user: UserInfo;
  private environmentDetails: EnvironmentDetails;

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

  private fetchEnvironmentDetails(): Promise<EnvironmentDetails> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.config.backendUrl + 'getEnvironmentDetails', {username: this.user.username, sessionKey: this.sessionKey})
        .subscribe(
          (response: EnvironmentDetails) => {
            resolve(response);
          },
          error => reject(error)
        );
    });
  }

  getEnvironmentDetails(): Promise<EnvironmentDetails> {
    if (isDefined(this.environmentDetails)) {
      return new Promise<EnvironmentDetails>(resolve => { resolve(this.environmentDetails); });
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
      this.http.post(this.config.backendUrl + 'login', {username: username, password: password})
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

  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const body = {username: this.user.username, sessionKey: this.sessionKey};
      this.http.post(this.config.backendUrl + 'logout', body)
        .subscribe(
          () => {
            this.sessionKey = undefined;
            this.user = undefined;
            this.environmentDetails = undefined;
            resolve();
          },
          error => reject(error)
        );
    });
  }

  getOrderHistory(): Promise<Order[]> {
    return new Promise<Order[]>((resolve, reject) => {
      this.http.post(this.config.backendUrl + 'getOrderHistory', {username: this.user.username, sessionKey: this.sessionKey})
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

  updateAccountInfo(user: UserInfo): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const body = {
        username: user.username,
        sessionKey: this.sessionKey,
        userInfo: user
      };
      this.http.post(this.config.backendUrl + 'updateAccountInfo', body)
        .subscribe(() => resolve(), error => reject(error));
    });
  }

  placeOrder(selectedBeverage: OrderOption, selectedAddOns: {key: string, value: string | boolean | number}[],
             deliveryLocation: DeliveryLocation): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey,
        orderInfo: new OrderInfo(selectedBeverage, selectedAddOns),
        deliveryLocation: deliveryLocation
      };
      this.http.post(this.config.backendUrl + 'placeOrder', body)
        .subscribe(
          response => resolve(response),
          error => reject(error)
        );
    });
  }

}
