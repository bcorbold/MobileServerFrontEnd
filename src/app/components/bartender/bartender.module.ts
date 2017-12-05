import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { POCFormModule } from '../../forms/poc/poc-form.module';
import { MessageModule, MessageService } from '../../services/message/message.module';
import { PageSelectorModule } from '../page-selector/page-selector.module';
import { BartenderComponent } from './bartender.component';

export { BartenderComponent } from './bartender.component';

@NgModule({
  declarations: [
    BartenderComponent
  ],
  exports: [
    BartenderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    MessageModule,
    POCFormModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    PageSelectorModule
  ],
  providers: [
    MessageService
  ]
})
export class BartenderModule { }
