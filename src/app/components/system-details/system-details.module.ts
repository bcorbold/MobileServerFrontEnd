import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';
import { SystemDetailsComponent } from './system-details.component';

export { SystemDetailsComponent } from './system-details.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatChipsModule,
    MatTooltipModule
  ],
  declarations: [
    SystemDetailsComponent
  ],
  exports: [
    SystemDetailsComponent
  ],
  providers: [
    CacheService,
    MessageService
  ]
})
export class SystemDetailsModule { }
