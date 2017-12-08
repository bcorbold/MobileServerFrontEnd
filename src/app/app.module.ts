// hammerjs is imported due to an issue in @angular/material
import 'hammerjs';

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccountInfoModule } from './components/account-info/account-info.module';
import { IncomingBatchesModule } from './components/incoming-batches/incoming-batches.module';
import { OrderHistoryModule } from './components/order-history/order-history.module';
import { PlaceOrderModule } from './components/place-order/place-order.module';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    AccountInfoModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    IncomingBatchesModule,
    OrderHistoryModule,
    PlaceOrderModule
  ],
  providers: [
    AppConfig
  ]
})
export class AppModule { }
