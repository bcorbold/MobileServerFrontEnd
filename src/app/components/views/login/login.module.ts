import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

import { AccountModule, AccountService } from '../../../services/account/account.module';

import { LoginComponent } from './login.component';

export { LoginComponent } from './login.component';

@NgModule({
  imports: [
    AccountModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
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
