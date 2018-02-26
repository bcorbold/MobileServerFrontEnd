import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MessageService } from './message.service';

export { MessageService } from './message.service';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class MessageModule { }
