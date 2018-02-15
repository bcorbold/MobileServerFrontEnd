import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AccountInfoModule } from './components/views/account-info/account-info.module';
import { HomeModule } from './components/views/home/home.module';
import { IncomingBatchesModule } from './components/views/incoming-batches/incoming-batches.module';
import { LoginModule } from './components/views/login/login.module';
import { OrderHistoryModule } from './components/views/order-history/order-history.module';
import { PlaceOrderModule } from './components/views/place-order/place-order.module';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';

const appRoutes: Routes = [
  { path: 'admin', component: HomeComponent },
  { path: 'user', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false,
        useHash: true
      }
    ),
    AccountInfoModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    HomeModule,
    IncomingBatchesModule,
    LoginModule,
    OrderHistoryModule,
    PlaceOrderModule
  ],
  providers: [
    AppConfig
  ]
})
export class AppModule { }
