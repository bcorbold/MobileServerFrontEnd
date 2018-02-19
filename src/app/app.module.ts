import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AccountInfoModule } from './components/account-info/account-info.module';
import { HomeModule } from './components/home/home.module';
import { IncomingBatchesModule } from './components/incoming-batches/incoming-batches.module';
import { LoginModule } from './components/login/login.module';
import { OrderHistoryModule } from './components/order-history/order-history.module';
import { PlaceOrderModule } from './components/place-order/place-order.module';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

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
