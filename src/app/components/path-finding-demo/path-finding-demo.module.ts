import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';

import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';
import { PathFindingDemoComponent } from './path-finding-demo.component';

export { PathFindingDemoComponent } from './path-finding-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  declarations: [
    PathFindingDemoComponent
  ],
  exports: [
    PathFindingDemoComponent
  ],
  providers: [
    CacheService,
    MessageService
  ]
})
export class PathFindingDemoModule { }
