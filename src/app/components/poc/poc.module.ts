import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { POCComponent } from './poc.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageModule, MessageService } from '../../services/message/message.module';
import {POCFormModule} from '../../forms/poc/poc-form.module';

export { POCComponent } from './poc.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MessageModule,
    POCFormModule
  ],
  declarations: [
    POCComponent
  ],
  providers: [
    MessageService
  ],
  exports: [
    POCComponent
  ]
})
export class POCComponentModule { }
