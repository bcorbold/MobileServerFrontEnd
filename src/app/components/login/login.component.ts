import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() sessionKey = new EventEmitter<string>();

  onLogin() {
    this.sessionKey.emit('xxxxx-xxxxxx-xxxxxx');
  }
}
