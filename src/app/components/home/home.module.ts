import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';

import { AccountInfoModule } from '../account-info/account-info.module';
import { IncomingBatchesModule } from '../incoming-batches/incoming-batches.module';
import { OrderHistoryModule } from '../order-history/order-history.module';
import { PlaceOrderModule } from '../place-order/place-order.module';
import { SystemDetailsModule } from '../system-details/system-details.module';

import { MediaIfModule } from '../../directives/media-if.module';
import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';
import { HomeComponent } from './home.component';

export { HomeComponent } from './home.component';

@NgModule({
  imports: [
    AccountInfoModule,
    BrowserModule,
    FlexLayoutModule,
    IncomingBatchesModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MediaIfModule,
    OrderHistoryModule,
    PlaceOrderModule,
    SystemDetailsModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    CacheService,
    MessageService
  ]
})
export class HomeModule { }
