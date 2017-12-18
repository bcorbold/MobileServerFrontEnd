// hammerjs is imported due to an issue in @angular/material
import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccountInfoModule } from './components/views/account-info/account-info.module';
import { IncomingBatchesModule } from './components/views/incoming-batches/incoming-batches.module';
import { OrderHistoryModule } from './components/views/order-history/order-history.module';
import { PlaceOrderModule } from './components/views/place-order/place-order.module';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    AccountInfoModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
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
