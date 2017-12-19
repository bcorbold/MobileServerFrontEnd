import { NgModule } from '@angular/core';

import { MessageModule } from '../message/message.module';

import { AppConfig } from '../../app.config';
import { AccountService } from './account.service';

export { AccountService } from './account.service';

@NgModule({
  imports: [
    MessageModule
  ],
  providers: [
    AppConfig,
    MessageModule
  ]
})
export class AccountModule { }
