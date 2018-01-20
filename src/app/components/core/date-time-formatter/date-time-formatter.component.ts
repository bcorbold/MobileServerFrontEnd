import { Component, Input } from '@angular/core';

@Component({
  selector: 'ms-date-time-formatter',
  templateUrl: './date-time-formatter.component.html',
  styleUrls: ['./date-time-formatter.component.scss']
})
export class DateTimeFormatterComponent {

  @Input() date = new Date();
  @Input() formatAsDate = true;
  @Input() timeTooEstimate = false; // todo: need to implement this

  formatDate(): string {
    return `${this.date.toDateString()} at ${this.formatTime()}`;
  }

  formatTime(): string {
    const hours: number = this.date.getHours();
    const minutes: number = this.date.getMinutes();
    const seconds: number = this.date.getSeconds();

    let formattedString = '';

    formattedString += hours < 10 ? `0${hours}:` : `${hours}:`;
    formattedString += minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    formattedString += seconds < 10 ? `0${seconds}` : `${seconds}`;

    return formattedString;
  }
}
