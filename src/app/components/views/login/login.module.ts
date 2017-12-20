import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AccountModule, AccountService } from '../../../services/account/account.module';

import { LoginComponent } from './login.component';

export { LoginComponent } from './login.component';

@NgModule({
  imports: [
    AccountModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AccountService
  ]
})
export class LoginModule { }
