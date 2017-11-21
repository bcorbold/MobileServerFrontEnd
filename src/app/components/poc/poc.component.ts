import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { POCGetBody } from '../../core/json/poc-get-body';
import { POCPostBody } from '../../core/json/poc-post-body';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'ms-poc-component',
  templateUrl: './poc.component.html'
})
export class POCComponent implements OnDestroy {

  private pollingSub: Subscription;

  getReqData: POCGetBody;
  postReqData: POCPostBody;

  formattedGetData = '{}';
  formattedPostData = '{}';

  constructor(private messageService: MessageService) {
    this.pollingSub = this.messageService.backendUpdates.subscribe(
      (getReqData: POCGetBody) => {
        this.getReqData = getReqData;
        this.formattedGetData = JSON.stringify(getReqData, null, 2);
      },
      err => { console.error(err); },
      () => { console.log('get fin'); }
    );
  }

  ngOnDestroy(): void {
    this.pollingSub.unsubscribe();
    this.pollingSub = undefined;
  }

  onSubmit(pocJson: POCPostBody) {
    this.messageService.sendMessage(pocJson).subscribe(
      (postReqData: any) => {
        this.postReqData = postReqData;
        this.formattedPostData = JSON.stringify(postReqData, null, 2);
      },
      err => { console.error(err); },
      () => { console.log('post fin'); }
    );
  }

}
