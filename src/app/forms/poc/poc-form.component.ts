import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { POCPostBody } from '../../core/json/poc-post-body';

@Component({
  selector: 'ms-poc-form',
  templateUrl: './poc-form.component.html'
})
export class POCFormComponent implements OnInit {

  @Output() submitted = new EventEmitter<POCPostBody>();
  @Output() pocPostJson = new POCPostBody();

  ngOnInit() {
    this.pocPostJson.led1State = true;
    this.pocPostJson.led2State = true;
    this.pocPostJson.userInfo = {
      id: '4c31bbb5-2a66-48ca-9b5c-8c7d04c8fcf5',
      name: 'Bob'
    };
  }

  onSubmit() {
    this.submitted.emit(this.pocPostJson);
  }
}
