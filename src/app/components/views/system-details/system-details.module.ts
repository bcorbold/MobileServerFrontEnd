import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTooltipModule } from '@angular/material';

import { MessageService } from '../../../services/message/message.service';
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
    MessageService
  ]
})
export class SystemDetailsModule { }
