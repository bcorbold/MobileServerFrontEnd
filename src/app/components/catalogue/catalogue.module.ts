import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { DesktopModule } from '../desktop/desktop.module';

import { CatalogueComponent } from './catalogue.component';
import { AccountInfoModule } from '../account-info/account-info.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
