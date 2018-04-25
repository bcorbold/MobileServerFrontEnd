import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CacheService } from '../../services/cache/cache.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ConfirmationModalModule } from '../confirmation-modal/confirmation-modal.module';

import { AccountInfoComponent } from './account-info.component';

export { AccountInfoComponent } from './account-info.component';

@NgModule({
  imports: [
    ConfirmationModalModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  declarations: [
    AccountInfoComponent
  ],
  entryComponents: [
    ConfirmationModalComponent
  ],
  exports: [
    AccountInfoComponent
  ],
  providers: [
    CacheService
  ]
})
export class AccountInfoModule { }
