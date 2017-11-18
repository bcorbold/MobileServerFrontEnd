import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'poc-component',
  templateUrl: './poc.component.html'
})
export class POCComponent  implements OnDestroy {

  private pollingSub: Subscription;

  data: any;
  formattedData: string;

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

  ngOnDestroy(): void {
    this.pollingSub.unsubscribe();
    this.pollingSub = undefined;
  }

  onSubmit(pocJson: any) {
    this.messageService.sendMessage(pocJson).subscribe(
      data => {
        this.data = data;
        this.formattedData = JSON.stringify(data, null, 2);
      },
      err => { console.error(err); },
      () => { console.log('post fin'); }
    );
  }

}
