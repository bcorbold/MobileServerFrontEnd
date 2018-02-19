import { NgModule } from '@angular/core';

import { MessageService } from '../message/message.service';
import { CacheService } from './cache.service';

export { CacheService } from './cache.service';

@NgModule({
  providers: [
    MessageService
  ]
})
export class CacheModule { }
