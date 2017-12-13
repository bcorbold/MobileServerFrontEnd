import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountInfoModule } from '../account-info/account-info.module';
import { IncomingBatchesModule } from '../incoming-batches/incoming-batches.module';
import { PlaceOrderModule } from '../place-order/place-order.module';
import { DesktopComponent } from './desktop.component';

export { DesktopComponent } from './desktop.component';

@NgModule({
  imports: [
    AccountInfoModule,
    BrowserAnimationsModule,
    BrowserModule,
    IncomingBatchesModule,
    FlexLayoutModule,
    PlaceOrderModule
  ],
  declarations: [
    DesktopComponent
  ],
  exports: [
    DesktopComponent
  ]
})
export class DesktopModule { }
