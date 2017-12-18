import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

export { LoginComponent } from './login.component';

@NgModule({
  imports: [
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
  ]
})
export class LoginModule { }
