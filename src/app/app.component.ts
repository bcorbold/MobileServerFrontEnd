import { Component } from '@angular/core';

import { MessageService } from './services/message/message.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  httpGetObservable: Subscription;

  constructor(private messageService: MessageService) {
    this.messageService.backendUpdates.subscribe(
      data => {},
      err => { console.error(err); },
      () => { console.log('fin'); }
    );
  }

  currentLedState = false;

  changeLedState(state: boolean) {
    this.currentLedState = state;
    this.httpGetObservable.unsubscribe();
    this.httpGetObservable = undefined;
  }

}
