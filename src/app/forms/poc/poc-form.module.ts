import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatSlideToggleModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';

import { POCFormComponent } from './poc-form.component';

export { POCFormComponent } from './poc-form.component';

@NgModule({
  declarations: [
      POCFormComponent
  ],
  exports: [
      POCFormComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule
  ]
})
export class POCFormModule { }
