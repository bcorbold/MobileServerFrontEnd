import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { isDefined } from '../../core/is-defined';

@Component({
  selector: 'ms-date-time-formatter',
  templateUrl: './date-time-formatter.component.html',
  styleUrls: ['./date-time-formatter.component.scss']
})
export class DateTimeFormatterComponent implements OnInit, OnDestroy {

  // todo: parsing time amount needs testing
  static MILLIS_PER_SECOND = 1000;
  static MILLIS_PER_MINUTE = 1000 * 60;
  static MILLIS_PER_HOUR = 1000 * 60 * 60;

  @Input() date = new Date();
  @Input() formatAsDate = true;
  @Input() timeTooEstimate = false;

  formattedDate: string;
  formattedTime: string;

  private secondCounter: Subscription;

  formatDate(date: Date): void {
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    let formattedString = '';

    formattedString += hours < 10 ? `0${hours}:` : `${hours}:`;
    formattedString += minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    formattedString += seconds < 10 ? `0${seconds}` : `${seconds}`;

    this.formattedDate = `${date.toDateString()} at ${formattedString}`;
  }

  formatTimeToo(millis: number): void {
    if (millis >= 0) {
      const h = Math.floor(millis / DateTimeFormatterComponent.MILLIS_PER_HOUR);
      const m = Math.floor(millis / DateTimeFormatterComponent.MILLIS_PER_MINUTE) - h * 60;
      const s = Math.floor(millis / DateTimeFormatterComponent.MILLIS_PER_SECOND) - m * 60;

      let formattedString = '';

      formattedString += h < 10 ? `0${h}:` : `${h}:`;
      formattedString += m < 10 ? `0${m}:` : `${m}:`;
      formattedString += s < 10 ? `0${s}` : `${s}`;

      this.formattedTime = formattedString;

    } else {
      this.formattedTime = '00:00:00';
    }
  }

  ngOnInit(): void {
    if (this.formatAsDate) {
      this.formatDate(this.date);
    }

    if (this.timeTooEstimate) {
      this.secondCounter = Observable.interval(1000).subscribe(() => {
        const now = new Date();
        this.formatTimeToo(new Date(this.date.toISOString()).getTime() - now.getTime());
      });
    }
  }

  ngOnDestroy(): void {
    if (isDefined(this.secondCounter)) {
      this.secondCounter.unsubscribe();
      this.secondCounter = undefined;
    }
  }
}
