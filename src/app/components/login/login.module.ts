import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';

import { LoginComponent } from './login.component';

export { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    CacheService,
    MessageService
  ]
})
export class LoginModule { }
