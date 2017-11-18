import { Component, EventEmitter, Output } from '@angular/core';
import { POCPostBody } from './poc-post';

@Component({
  selector: 'poc-form',
  templateUrl: './poc-form.component.html'
})
export class POCFormComponent {

  @Output() submitted = new EventEmitter();
  @Output() pocPostJson = new POCPostBody();

  onSubmit() {
    this.submitted.emit(this.pocPostJson);
  }
}
