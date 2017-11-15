import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { MessageService } from './services/message/message.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule
  ],
  providers: [
    AppConfig,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
