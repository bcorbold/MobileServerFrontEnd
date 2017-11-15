import { Component } from '@angular/core';

import { MessageService } from './services/message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private messageService: MessageService) {}

  currentLedState = false;

  changeLedState(state: boolean) {
    this.currentLedState = state;
    this.messageService.sendMessage();
  }

}
