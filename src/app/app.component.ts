import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MessageService } from './services/message/message.service';
import { PostBody } from './services/message/post-body';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  private pollingSub: Subscription;

  data: any;
  formattedData: string;
  led1State: boolean;
  led2State: boolean;

  constructor(private messageService: MessageService) {
    this.pollingSub = this.messageService.backendUpdates.subscribe(
      data => {
        this.data = data;
        this.formattedData = JSON.stringify(data, null, 2);
        },
      err => { console.error(err); },
      () => { console.log('get fin'); }
    );
  }

  updateStatus(): void {
    const postBody: PostBody = {
      led1State: this.led1State,
      led2State: this.led2State,
      userInfo: {
        id: '4c31bbb5-2a66-48ca-9b5c-8c7d04c8fcf5',
        name: 'Bob'
      }
    };

    this.messageService.sendMessage(postBody).subscribe(
      data => {
        this.data = data;
        this.formattedData = JSON.stringify(data, null, 2);
      },
      err => { console.error(err); },
      () => { console.log('post fin'); }
    );
  }

  ngOnDestroy(): void {
    this.pollingSub.unsubscribe();
    this.pollingSub = undefined;
  }

}
