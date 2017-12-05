// hammerjs is imported due to an issue in @angular/material
import 'hammerjs';

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { IncomingBatchesModule } from './components/incoming-batches/incoming-batches.module';
import { PlaceOrderModule } from './components/place-order/place-order.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    IncomingBatchesModule,
    PlaceOrderModule
  ],
  providers: [
    AppConfig
  ]
})
export class AppModule { }
