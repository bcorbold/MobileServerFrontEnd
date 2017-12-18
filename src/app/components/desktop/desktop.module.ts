import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountInfoModule } from '../views/account-info/account-info.module';
import { IncomingBatchesModule } from '../views/incoming-batches/incoming-batches.module';
import { OrderHistoryModule } from '../views/order-history/order-history.module';
import { PlaceOrderModule } from '../views/place-order/place-order.module';
import { DesktopComponent } from './desktop.component';

export { DesktopComponent } from './desktop.component';

@NgModule({
  imports: [
    AccountInfoModule,
    BrowserAnimationsModule,
    BrowserModule,
    IncomingBatchesModule,
    FlexLayoutModule,
    PlaceOrderModule,
    OrderHistoryModule
  ],
  declarations: [
    DesktopComponent
  ],
  exports: [
    DesktopComponent
  ]
})
export class DesktopModule { }
