import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AccountInfoModule } from '../account-info/account-info.module';
import { IncomingBatchesModule } from '../incoming-batches/incoming-batches.module';
import { OrderHistoryModule } from '../order-history/order-history.module';
import { PlaceOrderModule } from '../place-order/place-order.module';
import { SystemDetailsModule } from '../system-details/system-details.module';

import { DesktopComponent } from './desktop.component';

export { DesktopComponent } from './desktop.component';

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
    DesktopComponent
  ],
  exports: [
    DesktopComponent
  ]
})
export class DesktopModule { }
