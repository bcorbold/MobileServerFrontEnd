// hammerjs is imported due to an issue in @angular/material
import 'hammerjs';

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AccountInfoModule } from './components/account-info/account-info.module';
import { CatalogueModule } from './components/catalogue/catalogue.module';
import { DesktopModule } from './components/desktop/desktop.module';
import { LoginModule } from './components/login/login.module';
import { PlaceOrderModule } from './components/place-order/place-order.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { IncomingBatchesComponent } from './components/incoming-batches/incoming-batches.component';
import { LoginComponent } from './components/login/login.component';

import { Components } from './components/catalogue/components';

const appRoutes: Routes = [
  { path: 'desktop', component: DesktopComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' }
];

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
      } // <-- debugging purposes only
    ),
    AccountInfoModule,
    BrowserAnimationsModule,
    BrowserModule,
    CatalogueModule,
    DesktopModule,
    FlexLayoutModule,
    LoginModule,
    PlaceOrderModule
  ],
  providers: [
    AppConfig
  ]
})
export class AppModule { }
