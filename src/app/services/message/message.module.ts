import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppConfig } from '../../app.config';
import { MessageService } from './message.service';
import { PostBody } from './post-body';

export { MessageService } from './message.service';
export { PostBody } from './post-body';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AppConfig
  ]
})
export class MessageModule { }
