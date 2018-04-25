import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MediaIfModule } from '../../directives/media-if.module';
import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ConfirmationModalModule } from '../confirmation-modal/confirmation-modal.module';

import { PlaceOrderComponent } from './place-order.component';

export { PlaceOrderComponent } from './place-order.component';

@NgModule({
  imports: [
    ConfirmationModalModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MediaIfModule,
    ReactiveFormsModule
  ],
  declarations: [
    PlaceOrderComponent
  ],
  entryComponents: [
    ConfirmationModalComponent
  ],
  exports: [
    PlaceOrderComponent
  ],
  providers: [
    CacheService,
    MessageService
  ]
})
export class PlaceOrderModule { }
