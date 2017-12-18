// hammerjs is imported due to an issue in @angular/material
import 'hammerjs';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { CatalogueModule } from './components/catalogue/catalogue.module';
import { DesktopModule } from './components/views/desktop/desktop.module';
import { LoginModule } from './components/views/login/login.module';
import { AccountInfoModule } from './components/views/account-info/account-info.module';
import { IncomingBatchesModule } from './components/views/incoming-batches/incoming-batches.module';
import { OrderHistoryModule } from './components/views/order-history/order-history.module';
import { PlaceOrderModule } from './components/views/place-order/place-order.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { Components } from './components/catalogue/components';
import { DesktopComponent } from './components/views/desktop/desktop.component';
import { LoginComponent } from './components/views/login/login.component';

const appRoutes: Routes = [
  { path: 'desktop', component: DesktopComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' }
];
// const appRoutes: Routes = new AppConfig().appRoutes;

if (!environment.production) {
  appRoutes.push(
    {
      path: 'component-catalogue', component: CatalogueComponent,
      children: new Components().components
    }
  );
}

console.log(environment.production);

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
    CatalogueModule,
    DesktopModule,
    FlexLayoutModule,
    LoginModule,
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
