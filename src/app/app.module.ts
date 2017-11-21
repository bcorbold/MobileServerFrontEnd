// hammerjs is imported due to an issue in @angular/material
import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { POCComponentModule } from './components/poc/poc.module';
import { POCFormModule } from './forms/poc/poc-form.module';
import { MessageService } from './services/message/message.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    POCComponentModule,
    POCFormModule
  ],
  providers: [
    AppConfig,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
