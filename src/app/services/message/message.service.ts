// this is required since "Observable" doesn't include interval on import
import 'rxjs/add/observable/interval';

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppConfig } from '../../app.config';
import { isDefined } from '../../core/is-defined';
import { Order } from '../../core/order';
import { OrderOption } from '../../core/order-option';
import { UserInfo } from '../../core/user-info';

// mock data
const mockOrderHistory: any[] = [
  {
    id: '9f1f05c8-da88-4f11-a49b-ab486b569666',
    state: 'Waiting',
    deliveryEta: '2018-01-31T10:30:00.000Z',
    orderDate: '2018-01-31T10:25:00.000Z',
    deliveredDate: null,
    orderInfo: {
      orderOption: OrderOption.coffee(),
      selectedAddOns: [
        {key: 'milk', value: 2},
        {key: 'sugar', value: 2}
      ]
    }
  },
  {
    id: 'c251615b-4e8c-4551-ae1a-3ac9ac9ef6c1',
    state: 'Delivering',
    deliveryEta: '2018-01-31T10:25:00.000Z',
    orderDate: '2018-01-31T10:20:00.000Z',
    deliveredDate: null,
    orderInfo: {
      orderOption: OrderOption.tea(),
      selectedAddOns: [
        {key: 'milk', value: 2},
        {key: 'sugar', value: 2},
        {key: 'bag in', value: true}
      ]
    }
  },
  {
    id: '5473755b-c562-4148-b7a4-d0c479a35b20',
    state: 'Delivered',
    deliveryEta: null,
    orderDate: '2018-01-30T09:30:00.000Z',
    deliveredDate: '2018-01-30T09:45:00.000Z',
    orderInfo: {
      orderOption: OrderOption.coke(),
      selectedAddOns: [
        {key: 'ice', value: true}
      ]
    }
  },
  {
    id: '9f1f05c8-da88-4f11-a49b-ab486b569666',
    state: 'Waiting',
    deliveryEta: '2018-01-31T10:30:00.000Z',
    orderDate: '2018-01-31T10:25:00.000Z',
    deliveredDate: null,
    orderInfo: {
      orderOption: OrderOption.coffee(),
      selectedAddOns: [
        {key: 'milk', value: 2},
        {key: 'sugar', value: 2}
      ]
    }
  },
  {
    id: 'c251615b-4e8c-4551-ae1a-3ac9ac9ef6c1',
    state: 'Delivering',
    deliveryEta: '2018-01-31T10:25:00.000Z',
    orderDate: '2018-01-31T10:20:00.000Z',
    deliveredDate: null,
    orderInfo: {
      orderOption: OrderOption.tea(),
      selectedAddOns: [
        {key: 'milk', value: 2},
        {key: 'sugar', value: 2},
        {key: 'bag in', value: true}
      ]
    }
  },
  {
    id: '5473755b-c562-4148-b7a4-d0c479a35b20',
    state: 'Delivered',
    deliveryEta: null,
    orderDate: '2018-01-30T09:30:00.000Z',
    deliveredDate: '2018-01-30T09:45:00.000Z',
    orderInfo: {
      orderOption: OrderOption.coke(),
      selectedAddOns: [
        {key: 'ice', value: true}
      ]
    }
  },
  {
    id: '9f1f05c8-da88-4f11-a49b-ab486b569666',
    state: 'Waiting',
    deliveryEta: '2018-01-31T10:30:00.000Z',
    orderDate: '2018-01-31T10:25:00.000Z',
    deliveredDate: null,
    orderInfo: {
      orderOption: OrderOption.coffee(),
      selectedAddOns: [
        {key: 'milk', value: 2},
        {key: 'sugar', value: 2}
      ]
    }
  },
  {
    id: 'c251615b-4e8c-4551-ae1a-3ac9ac9ef6c1',
    state: 'Delivering',
    deliveryEta: '2018-01-31T10:25:00.000Z',
    orderDate: '2018-01-31T10:20:00.000Z',
    deliveredDate: null,
    orderInfo: {
      orderOption: OrderOption.tea(),
      selectedAddOns: [
        {key: 'milk', value: 2},
        {key: 'sugar', value: 2},
        {key: 'bag in', value: true}
      ]
    }
  },
  {
    id: '5473755b-c562-4148-b7a4-d0c479a35b20',
    state: 'Delivered',
    deliveryEta: null,
    orderDate: '2018-01-30T09:30:00.000Z',
    deliveredDate: '2018-01-30T09:45:00.000Z',
    orderInfo: {
      orderOption: OrderOption.coke(),
      selectedAddOns: [
        {key: 'ice', value: true}
      ]
    }
  },
  {
    id: '9f1f05c8-da88-4f11-a49b-ab486b569666',
    state: 'Waiting',
    deliveryEta: '2018-01-31T10:30:00.000Z',
    orderDate: '2018-01-31T10:25:00.000Z',
    deliveredDate: null,
    orderInfo: {
      orderOption: OrderOption.coffee(),
      selectedAddOns: [
        {key: 'milk', value: 2},
        {key: 'sugar', value: 2}
      ]
    }
  },
  {
    id: 'c251615b-4e8c-4551-ae1a-3ac9ac9ef6c1',
    state: 'Delivering',
    deliveryEta: '2018-01-31T10:25:00.000Z',
    orderDate: '2018-01-31T10:20:00.000Z',
    deliveredDate: null,
    orderInfo: {
      orderOption: OrderOption.tea(),
      selectedAddOns: [
        {key: 'milk', value: 2},
        {key: 'sugar', value: 2},
        {key: 'bag in', value: true}
      ]
    }
  },
  {
    id: '5473755b-c562-4148-b7a4-d0c479a35b20',
    state: 'Delivered',
    deliveryEta: null,
    orderDate: '2018-01-30T09:30:00.000Z',
    deliveredDate: '2018-01-30T09:45:00.000Z',
    orderInfo: {
      orderOption: OrderOption.coke(),
      selectedAddOns: [
        {key: 'ice', value: true}
      ]
    }
  }
];

@Injectable()
export class MessageService implements OnDestroy {

  private pollingSubscription: Subscription;
  private sessionKey: string;

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

  login(username: string, password: string): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.devUrl + 'login', {username: username, password: password})
        .subscribe(
          (response: any) => {
                  console.log(response);
                  this.sessionKey = response.sessionKey;
                  resolve(response.userInfo);
                },
          (error: any) => {
                  console.log(error);
                  reject();
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
    return new Promise<Order[]>((resolve => {
      const orderHistory: Order[] = [];

      mockOrderHistory.forEach(order => {
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
    }));
  }

}
