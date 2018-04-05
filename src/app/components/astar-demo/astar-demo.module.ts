import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';

import { MatDialogModule } from '@angular/material';
import { AStarDemoComponent } from './astar-demo.component';

export { AStarDemoComponent } from './astar-demo.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule
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
