import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../../environments/environment';

import { Batch } from '../../core/batch';
import { DeliveryLocation } from '../../core/delivery-location';
import { Edge } from '../../core/edge';
import { EnvironmentDetails } from '../../core/environment-details';
import { LocationMap } from '../../core/location-map';
import { Order } from '../../core/order';
import { OrderInfo } from '../../core/order-info';
import { SystemDetails } from '../../core/system-details';
import { UserInfo } from '../../core/user-info';
import { Vertex } from '../../core/vertex';
import { reject } from 'q';

@Injectable()
export class MessageService {
  private static maxNumberOfRetries = 1;
  private static retryErrorCode = 418;

  private sessionKey: string;
  private user: UserInfo;

  userUpdates: Subject<UserInfo> = new Subject<UserInfo>();
  orderPlacedUpdate: Subject<Order> = new Subject<Order>();

  constructor(private http: HttpClient) {}

  getEnvironmentDetails(retryCount = 0): Promise<EnvironmentDetails> {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey
    };
    return this.http.post(environment.backendUrl + 'getEnvironmentDetails', body).toPromise()
      .then((response: EnvironmentDetails) => response)
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.getEnvironmentDetails(retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  login(username: string, password: string, retryCount = 0): Promise<UserInfo> {
    return this.http.post(environment.backendUrl + 'login', {username: username, password: password}).toPromise()
      .then((response: {sessionKey: string, userInfo: UserInfo}) => {
        this.sessionKey = response.sessionKey;
        this.user = response.userInfo;
        this.userUpdates.next(this.user);
        return this.user;
      })
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.login(username, password, retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  logout(retryCount = 0): Promise<void> {
    // todo: make sure all subscriptions are finished
    // todo: change flag in the service, subs check that flag before next request, once they all give the "OK" resolve to this promise
    const body = {username: this.user.username, sessionKey: this.sessionKey};
    return this.http.post(environment.backendUrl + 'logout', body).toPromise()
      .then(() => {
        this.sessionKey = undefined;
        this.user = undefined;
        this.userUpdates.next(undefined);
      })
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.logout(retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  updateAccountInfo(user: UserInfo, retryCount = 0): Promise<void> {
    const body = {
      username: user.username,
      sessionKey: this.sessionKey,
      userInfo: user
    };
    return this.http.post(environment.backendUrl + 'updateAccountInfo', body).toPromise()
      .then(() => {
        this.user = user;
        this.userUpdates.next(this.user);
      })
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.updateAccountInfo(user, retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  sendBatch(batch: Batch, retryCount = 0): Promise<void> {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey,
      batchId: batch.id
    };
    return this.http.post(environment.backendUrl + 'sendBatch', body).toPromise()
      .then(() => null)
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.sendBatch(batch, retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  getIncomingBatches(retryCount = 0): Promise<Batch[]> {
    const body = {username: this.user.username, sessionKey: this.sessionKey};
    return this.http.post(environment.backendUrl + 'getIncomingBatches', body).toPromise()
      .then((response: {batches: Batch[]}) => {
        return response.batches;
      })
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.getIncomingBatches(retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  getOrderHistory(retryCount = 0): Promise<Order[]> {
    const body = {username: this.user.username, sessionKey: this.sessionKey};
    return this.http.post(environment.backendUrl + 'getOrderHistory', body).toPromise()
      .then((response: {orderHistory: Order[]}) => response.orderHistory)
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.getOrderHistory(retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  getOrderUpdates(ordersToMonitor: Order[], retryCount = 0): Promise<Order[]> {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey,
      orders: ordersToMonitor
    };
    return this.http.post(environment.backendUrl + 'getOrderUpdates', body).toPromise()
      .then((response: {orders: Order[]}) => response.orders)
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.getOrderUpdates(ordersToMonitor, retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  placeOrder(orderInfo: OrderInfo, deliveryLocation: DeliveryLocation, retryCount: number = 0): Promise<Order> {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey,
      orderInfo: orderInfo,
      deliveryLocation: deliveryLocation
    };
    return this.http.post(environment.backendUrl + 'placeOrder', body).toPromise()
      .then((response: {order: Order}) => {
        this.orderPlacedUpdate.next(response.order);
        return response.order;
      }).catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.placeOrder(orderInfo, deliveryLocation, retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  getSystemDetails(retryCount = 0): Promise<SystemDetails> {
    const body = {
      username: this.user.username,
      sessionKey: this.sessionKey
    };
    return this.http.post(environment.backendUrl + 'getSystemDetails', body).toPromise()
      .then((response: SystemDetails) => response)
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.getSystemDetails(retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  getMap(retryCount = 0): Promise<LocationMap> {
    return this.http.get(environment.backendUrl + 'getMap').toPromise()
      .then((response: any) => {
        const map = new LocationMap();
        response.vertices.forEach((vertex: any) => {
          map.vertices.push(new Vertex(vertex));
        });
        response.edges.forEach((edge: any) => {
          map.edges.push(new Edge(edge));
        });
        return map;
      })
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.getMap(retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

  getPath(vertices: Vertex[], retryCount = 0): Promise<Edge[]> {
    const body = {
      username: '',
      sessionKey: '',
      vertexValues: vertices
    };
    return this.http.post(environment.backendUrl + 'getPath', body).toPromise()
      .then(((response: any[]) => {
        const convertedEdges: Edge[] = [];

        response.forEach(edge => {
          convertedEdges.push(new Edge(edge));
        });

        return convertedEdges;
      }))
      .catch(err => {
        if (err.status === MessageService.retryErrorCode && retryCount < MessageService.maxNumberOfRetries) {
          retryCount++;
          return this.getPath(vertices, retryCount + 1);
        }
        return Promise.reject(err);
      });
  }

}
