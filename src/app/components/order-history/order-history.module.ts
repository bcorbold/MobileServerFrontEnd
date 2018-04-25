import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CacheService } from '../../services/cache/cache.service';

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
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  providers: [
    CacheService
  ]
})
export class OrderHistoryModule { }
