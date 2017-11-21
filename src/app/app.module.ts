import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatSlideToggleModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { MessageService } from './services/message/message.module';
import { POCFormModule } from './forms/poc/poc-form.module';
import { POCComponentModule } from './components/poc/poc.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSlideToggleModule,
    POCFormModule,
    POCComponentModule
  ],
  providers: [
    AppConfig,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
