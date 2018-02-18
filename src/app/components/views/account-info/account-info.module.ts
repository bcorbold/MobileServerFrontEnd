import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';

import { CacheService } from '../../../services/cache/cache.service';
import { MessageService } from '../../../services/message/message.service';
import { AccountInfoComponent } from './account-info.component';

export { AccountInfoComponent } from './account-info.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  declarations: [
    AccountInfoComponent
  ],
  exports: [
    AccountInfoComponent
  ],
  providers: [
    CacheService,
    MessageService
  ]
})
export class AccountInfoModule { }
