import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { DesktopModule } from '../desktop/desktop.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CatalogueComponent } from './catalogue.component';
import { AccountInfoModule } from '../views/account-info/account-info.module';

export { CatalogueComponent } from './catalogue.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    AccountInfoModule,
    DesktopModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [
    CatalogueComponent
  ],
  exports: [
    CatalogueComponent
  ]
})
export class CatalogueModule { }
