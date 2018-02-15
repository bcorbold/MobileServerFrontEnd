import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AccountInfoModule } from '../account-info/account-info.module';
import { IncomingBatchesModule } from '../incoming-batches/incoming-batches.module';
import { OrderHistoryModule } from '../order-history/order-history.module';
import { PlaceOrderModule } from '../place-order/place-order.module';
import { SystemDetailsModule } from '../system-details/system-details.module';

import { HomeComponent } from './home.component';

export { HomeComponent } from './home.component';

@NgModule({
  imports: [
    AccountInfoModule,
    BrowserModule,
    FlexLayoutModule,
    IncomingBatchesModule,
    OrderHistoryModule,
    PlaceOrderModule,
    SystemDetailsModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
