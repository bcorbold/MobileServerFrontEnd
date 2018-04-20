import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../../environments/environment';

import { Batch } from '../../core/batch';
import { DeliveryLocation } from '../../core/delivery-location';
import { EnvironmentDetails } from '../../core/environment-details';
import { Order } from '../../core/order';
import { OrderInfo } from '../../core/order-info';
import { Path } from '../../core/path';
import { SystemDetails } from '../../core/system-details';
import { UserInfo } from '../../core/user-info';
import { VerticesAndEdges } from '../../core/vertices-and-edges';

@Injectable()
export class MessageService {

  private sessionKey: string;
  private user: UserInfo;

  userUpdates: Subject<UserInfo> = new Subject<UserInfo>();
  orderPlacedUpdate: Subject<Order> = new Subject<Order>();

  constructor(private http: HttpClient) {}

  getEnvironmentDetails(): Promise<EnvironmentDetails> {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey
    };
    return this.http.post(environment.backendUrl + 'getEnvironmentDetails', body)
      .toPromise().then((response: EnvironmentDetails) => response);
  }

  login(username: string, password: string): Promise<UserInfo> {
    return this.http.post(environment.backendUrl + 'login', {username: username, password: password}).toPromise()
      .then((response: {sessionKey: string, userInfo: UserInfo}) => {
        this.sessionKey = response.sessionKey;
        this.user = response.userInfo;
        this.userUpdates.next(this.user);
        return this.user;
      });
  }

  logout(): Promise<void> {
    // todo: make sure all subscriptions are finished
    const body = {username: this.user.username, sessionKey: this.sessionKey};
    return this.http.post(environment.backendUrl + 'logout', body).toPromise()
      .then(() => {
        this.sessionKey = undefined;
        this.user = undefined;
        this.userUpdates.next(undefined);
      });
  }

  updateAccountInfo(user: UserInfo): Promise<void> {
    const body = {
      username: user.username,
      sessionKey: this.sessionKey,
      userInfo: user
    };
    return this.http.post(environment.backendUrl + 'updateAccountInfo', body).toPromise()
      .then(() => {
        this.user = user;
        this.userUpdates.next(this.user);
      });
  }

  sendBatch(batch: Batch): Promise<void> {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey,
      batchId: batch.id
    };
    return this.http.post(environment.backendUrl + 'sendBatch', body).toPromise().then(() => null);
  }

  getIncomingBatches(): Promise<Batch[]> {
    const body = {username: this.user.username, sessionKey: this.sessionKey};
    return this.http.post(environment.backendUrl + 'getIncomingBatches', body)
      .toPromise().then((response: {batches: Batch[]}) => {
        return response.batches;
      });
  }

  getOrderHistory(): Promise<Order[]> {
    const body = {username: this.user.username, sessionKey: this.sessionKey};
    return this.http.post(environment.backendUrl + 'getOrderHistory', body)
      .toPromise().then((response: {orderHistory: Order[]}) => response.orderHistory);
  }

  getOrderUpdates(ordersToMonitor: Order[]): Promise<Order[]> {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey,
      orders: ordersToMonitor
    };
    return this.http.post(environment.backendUrl + 'getOrderUpdates', body)
      .toPromise().then((response: {orders: Order[]}) => response.orders);
  }

  placeOrder(orderInfo: OrderInfo, deliveryLocation: DeliveryLocation): Promise<Order> {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey,
      orderInfo: orderInfo,
      deliveryLocation: deliveryLocation
    };
    return this.http.post(environment.backendUrl + 'placeOrder', body)
      .toPromise().then((response: {order: Order}) => {
        this.orderPlacedUpdate.next(response.order);
        return response.order;
      });
  }

  getSystemDetails(): Promise<SystemDetails> {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey
    };
    return this.http.post(environment.backendUrl + 'getSystemDetails', body)
      .toPromise().then((response: SystemDetails) => response);
  }

  getVerticesAndEdges(): Promise<VerticesAndEdges> {
    const body = { username: '', sessionKey: '' }; // todo: is this needed?
    return this.http.post(environment.backendUrl + 'getVerticesAndEdges', body)
      .toPromise().then((response: VerticesAndEdges) => response);
  }

  getPath(vertices: any): Promise<Path> {
    const body = {
      username: '',
      sessionKey: '',
      vertexValues: vertices
    };
    return this.http.post(environment.backendUrl + 'getPath', body)
      .toPromise().then((response: Path) => response);
  }

  getPathWithHistory(vertices: any): Promise<Path> {
    const body = {
      username: '',
      sessionKey: '',
      vertexValues: vertices
    };
    return this.http.post(environment.backendUrl + 'getPathWithHistory', body).toPromise()
      .then((response: Path) => response);
  }

}
