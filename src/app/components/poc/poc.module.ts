import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { POCFormModule } from '../../forms/poc/poc-form.module';
import { MessageModule, MessageService } from '../../services/message/message.module';
import { POCComponent } from './poc.component';

export { POCComponent } from './poc.component';

@NgModule({
  declarations: [
    POCComponent
  ],
  exports: [
    POCComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    MessageModule,
    POCFormModule
  ],
  providers: [
    MessageService
  ]
})
export class POCComponentModule { }
