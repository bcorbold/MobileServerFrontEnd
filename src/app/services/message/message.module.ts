import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppConfig } from '../../app.config';
import { MessageService } from './message.service';

export { MessageService } from './message.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AppConfig
  ]
})
export class MessageModule { }
