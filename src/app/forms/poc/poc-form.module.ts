import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';

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
  providers: [],
  exports: [
    POCFormComponent
  ]
})
export class POCFormModule { }
