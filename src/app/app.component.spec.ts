import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccountInfoModule } from './components/views/account-info/account-info.module';
import { IncomingBatchesModule } from './components/views/incoming-batches/incoming-batches.module';
import { OrderHistoryModule } from './components/views/order-history/order-history.module';
import { PlaceOrderModule } from './components/views/place-order/place-order.module';


import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { AppModule } from './app.module';

const appRoutes: Routes = new AppConfig().appRoutes;

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(
        appRoutes,
        {
          enableTracing: false,
          useHash: true
        }
      ),
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
