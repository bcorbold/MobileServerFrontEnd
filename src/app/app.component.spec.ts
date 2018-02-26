import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccountInfoModule } from './components/account-info/account-info.module';
import { IncomingBatchesModule } from './components/incoming-batches/incoming-batches.module';
import { OrderHistoryModule } from './components/order-history/order-history.module';
import { PlaceOrderModule } from './components/place-order/place-order.module';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { AppModule } from './app.module';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AccountInfoModule,
        AppModule,
        BrowserAnimationsModule,
        BrowserModule,
        IncomingBatchesModule,
        OrderHistoryModule,
        PlaceOrderModule
      ],
      providers: [
        AppConfig
      ]
    }).compileComponents();
  }));

  it ('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

});
