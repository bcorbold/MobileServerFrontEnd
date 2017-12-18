import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './login.component';

export { LoginComponent } from './login.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
