import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { POCFormComponent } from './poc-form.component';

export { POCFormComponent } from './poc-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    MatSlideToggleModule
  ],
  declarations: [
    POCFormComponent
  ],
  exports: [
    POCFormComponent
  ]
})
export class POCFormModule { }
