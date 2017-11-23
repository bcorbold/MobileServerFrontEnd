import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

import { NewOrderComponent } from './new-order.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [
    NewOrderComponent
  ],
  exports: [
    NewOrderComponent
  ]
})
export class NewOrderModule { }
