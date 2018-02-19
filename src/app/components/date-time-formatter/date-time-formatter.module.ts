import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { DateTimeFormatterComponent } from './date-time-formatter.component';

export { DateTimeFormatterComponent } from './date-time-formatter.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule
  ],
  declarations: [
    DateTimeFormatterComponent
  ],
  exports: [
    DateTimeFormatterComponent
  ]
})
export class DateTimeFormatterModule { }
