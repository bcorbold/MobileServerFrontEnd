import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../../environments/environment';

import { Batch } from '../../core/batch';
import { DeliveryLocation } from '../../core/delivery-location';
import { EnvironmentDetails } from '../../core/environment-details';
import { Order } from '../../core/order';
import { OrderInfo } from '../../core/order-info';
import { OrderOption } from '../../core/order-option';
import { Path } from '../../core/path';
import { SystemDetails } from '../../core/system-details';
import { UserInfo } from '../../core/user-info';
import { VerticesAndEdges } from '../../core/vertices-and-edges';

@Injectable()
export class MessageService {

  private sessionKey: string;
  private user: UserInfo; // todo: would be nice to get rid of this, don't think it's possible

  userUpdates: Subject<UserInfo> = new Subject<UserInfo>();
  orderPlacedUpdate: Subject<Order> = new Subject<Order>();

  constructor(private http: HttpClient) {}

  getEnvironmentDetails(): Promise<EnvironmentDetails> {
    return new Promise<any>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey
      };

      this.http.post(environment.backendUrl + 'getEnvironmentDetails', body)
        .subscribe((response: EnvironmentDetails) => resolve(response), error => reject(error));
    });
  }

  login(username: string, password: string): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.backendUrl + 'login', {username: username, password: password})
        .subscribe(
          (response: {sessionKey: string, userInfo: UserInfo}) => {
            this.sessionKey = response.sessionKey;
            this.user = response.userInfo;
            this.userUpdates.next(this.user);
            resolve();
          },
          error => reject('Invalid username or password') // todo: can do a better job of handling this
        );
    });
  }

  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const body = {username: this.user.username, sessionKey: this.sessionKey};
      this.http.post(environment.backendUrl + 'logout', body)
        .subscribe(
          () => {
            this.sessionKey = undefined;
            this.user = undefined;
            this.userUpdates.next(undefined);
            resolve();
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
      this.http.post(environment.backendUrl + 'updateAccountInfo', body)
        .subscribe(
          () => {
            this.user = user;
            this.userUpdates.next(this.user);
            resolve();
          },
          error => reject(error));
    });
  }

  sendBatch(batch: Batch): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey,
        batchId: batch.id
      };

      // todo: can we just map this???
      this.http.post(environment.backendUrl + 'sendBatch', body).subscribe(() => resolve(), error => reject(error));
    });
  }

  getIncomingBatches(): Promise<Batch[]> {
    return new Promise<Batch[]>((resolve, reject) => {
      const body = {username: this.user.username, sessionKey: this.sessionKey};
      this.http.post(environment.backendUrl + 'getIncomingBatches', body)
        .subscribe(
          (response: {batches: Batch[]}) => resolve(response.batches),
          error => reject(error)
        );
    });
  }

  getOrderHistory(): Promise<Order[]> {
    return new Promise<Order[]>((resolve, reject) => {
      const body = {username: this.user.username, sessionKey: this.sessionKey};
      this.http.post(environment.backendUrl + 'getOrderHistory', body).subscribe(
        (response: {orderHistory: Order[]}) => resolve(response.orderHistory),
        error => reject(error)
      );
    });
  }

  getOrderUpdates(ordersToMonitor: Order[]): Promise<Order[]> {
    return new Promise<Order[]>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey,
        orders: ordersToMonitor
      };
      this.http.post(environment.backendUrl + 'getOrderUpdates', body)
        .subscribe(
          (response: {orders: Order[]}) => resolve(response.orders),
          error => reject(error)
        );
    });
  }

  // todo: consolidate input arguments down
  placeOrder(selectedBeverage: OrderOption, selectedAddOns: {key: string, value: string | boolean | number}[],
             deliveryLocation: DeliveryLocation): Promise<Order> {
    return new Promise<Order>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey,
        orderInfo: new OrderInfo(selectedBeverage, selectedAddOns),
        deliveryLocation: deliveryLocation
      };
      this.http.post(environment.backendUrl + 'placeOrder', body)
        .subscribe((response: {order: Order}) => {
          this.orderPlacedUpdate.next(response.order);
          resolve(response.order);
        }, error => reject(error));
    });
  }

  getSystemDetails(): Promise<SystemDetails> {
    return new Promise<SystemDetails>((resolve, reject) => {
      const body = {
        username: this.user.username,
        sessionKey: this.sessionKey
      };

      this.http.post(environment.backendUrl + 'getSystemDetails', body).subscribe(
        (response: SystemDetails) => resolve(response),
        error => reject(error)
      );
    });
  }

  getVerticesAndEdges(): Promise<VerticesAndEdges> {
    return new Promise<VerticesAndEdges>((resolve, reject) => {
      const body = {
        username: '',
        sessionKey: ''
      };

      this.http.post(environment.backendUrl + 'getVerticesAndEdges', body).subscribe(
        (response: VerticesAndEdges) => resolve(response),
        error => reject(error)
      );
    });
  }

  getPath(vertices: any): Promise<Path> {
    return new Promise<Path>((resolve, reject) => {
      const body = {
        username: '',
        sessionKey: '',
        vertexValues: vertices
      };

      // todo: can we just map this???
      this.http.post(environment.backendUrl + 'getPath', body).subscribe(
        (response: Path) => resolve(response),
        error => reject(error)
      );
    });
  }

  getPathWithHistory(vertices: any): Promise<Path> {
    return new Promise<Path>((resolve, reject) => {
      const body = {
        username: '',
        sessionKey: '',
        vertexValues: vertices
      };

      // todo: can we just map this???
      this.http.post(environment.backendUrl + 'getPathWithHistory', body).subscribe(
        (response: Path) => resolve(response),
        error => reject(error)
      );
    });
  }

}
