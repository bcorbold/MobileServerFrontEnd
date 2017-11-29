import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

import { PlaceOrderComponent } from './place-order.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [
    PlaceOrderComponent
  ],
  exports: [
    PlaceOrderComponent
  ]
})
export class PlaceOrderModule { }
