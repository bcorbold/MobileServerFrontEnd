import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

import { AccountInfoComponent } from './account-info.component';

export { AccountInfoComponent } from './account-info.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [
    AccountInfoComponent
  ],
  exports: [
    AccountInfoComponent
  ]
})
export class AccountInfoModule { }
