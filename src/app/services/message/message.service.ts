// this is required since "Observable" doesn't include interval on import
import 'rxjs/add/observable/interval';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AppConfig } from '../../app.config';
import { Batch } from '../../core/batch';
import { DeliveryLocation } from '../../core/delivery-location';
import { EnvironmentDetails } from '../../core/environment-details';
import { isDefined } from '../../core/is-defined';
import { Order } from '../../core/order';
import { OrderInfo } from '../../core/order-info';
import { OrderOption } from '../../core/order-option';
import { UserInfo } from '../../core/user-info';
import { RobotStatus } from '../../core/robot-status';

@Injectable()
export class MessageService implements OnDestroy {

  private static BATCH_POLLING_RATE = 5000;

  private sessionKey: string;
  private user: UserInfo;
  private environmentDetails: EnvironmentDetails;
  private batchPollingTimer: Subscription;
  private incomingBatchesSubject: Subject<Batch[]>;
  private incomingBatchesCache: Batch[];

  constructor(@Inject(AppConfig) private config: AppConfig, private http: HttpClient) {}

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

  login(username: string, password: string): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.backendUrl + 'login', {username: username, password: password})
        .subscribe(
          (response: any) => {
                  this.sessionKey = response.sessionKey;
                  this.user = response.userInfo;
                  resolve(response.userInfo);
                },
          error => reject(error)
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
          error => reject(error)
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

  getIncomingBatches(): Subject<Batch[]> {
    if (isDefined(this.incomingBatchesSubject)) {
      setTimeout(() => {
        this.incomingBatchesSubject.next(this.incomingBatchesCache);
      });
      return this.incomingBatchesSubject;
    } else {
      this.incomingBatchesSubject = new Subject<Batch[]>();

      // send request now so that we don't have to wait the polling time till the first response
      const body = {username: this.user.username, sessionKey: this.sessionKey};
      this.http.post(this.config.backendUrl + 'getIncomingBatches', body)
        .subscribe((response: {batches: Batch[]}) => {
          this.incomingBatchesCache = response.batches;
          this.incomingBatchesSubject.next(this.incomingBatchesCache);
        });

      this.batchPollingTimer = Observable.interval(MessageService.BATCH_POLLING_RATE).subscribe(() => {
        this.http.post(this.config.backendUrl + 'getIncomingBatches', body)
          .subscribe((response: {batches: Batch[]}) => {
            this.incomingBatchesCache = response.batches;
            this.incomingBatchesSubject.next(this.incomingBatchesCache);
          });
      });
      return this.incomingBatchesSubject;
    }
  }

  sendBatch(batch: Batch): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey,
        batchId: batch.id
      };

      // todo: can we just map this???
      this.http.post(this.config.backendUrl + 'sendBatch', body).subscribe(
        () => resolve(),
        error => reject(error)
      );
    });
  }

  getRobotStatusUpdates(): Promise<RobotStatus[]> {
    return new Promise<RobotStatus[]>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey
      };

      this.http.post(this.config.backendUrl + 'getRobotStatusUpdates', body).subscribe(
        (response: {robotStatuses: RobotStatus[]}) => resolve(response.robotStatuses),
        error => reject(error)
      );
    });
  }

  ngOnDestroy(): void {
    if (isDefined(this.batchPollingTimer)) {
      this.batchPollingTimer.unsubscribe();
      this.batchPollingTimer = undefined;
    }
    if (isDefined(this.incomingBatchesSubject)) {
      this.incomingBatchesSubject.complete();
      this.incomingBatchesSubject = undefined;
    }
  }

}
