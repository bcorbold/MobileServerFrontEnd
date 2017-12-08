import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatInputModule, MatSlideToggleModule } from '@angular/material';

import { PageSelectorModule } from '../page-selector/page-selector.module';
import { OrderHistoryComponent } from './order-history.component';

export { OrderHistoryComponent } from './order-history.component';

@NgModule({
  declarations: [
    OrderHistoryComponent
  ],
  exports: [
    OrderHistoryComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    // PageSelectorModule
  ]
})
export class OrderHistoryModule { }
