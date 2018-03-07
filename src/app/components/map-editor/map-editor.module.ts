import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';

import { MapEditorComponent, PopupDialogComponent } from './map-editor.component';
import { MatDialogModule } from '@angular/material';

export { MapEditorComponent } from './map-editor.component';

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
  entryComponents: [PopupDialogComponent],
  declarations: [
    MapEditorComponent,
    PopupDialogComponent
  ],
  exports: [
    MapEditorComponent,
    PopupDialogComponent
  ],
  providers: [
    CacheService,
    MessageService
  ]
})
export class MapEditorModule { }
