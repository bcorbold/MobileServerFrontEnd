import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DesktopComponent } from './desktop.component';
import { AccountInfoModule } from '../account-info/account-info.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PlaceOrderModule } from '../place-order/place-order.module';

export { DesktopComponent } from './desktop.component';

@NgModule({
  imports: [
    AccountInfoModule,
    BrowserAnimationsModule,
    BrowserModule,
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
