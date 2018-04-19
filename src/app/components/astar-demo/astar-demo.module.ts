import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';

import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';
import { AStarDemoComponent } from './astar-demo.component';

export { AStarDemoComponent } from './astar-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  declarations: [
    AStarDemoComponent
  ],
  exports: [
    AStarDemoComponent
  ],
  providers: [
    CacheService,
    MessageService
  ]
})
export class AstarDemoModule { }
