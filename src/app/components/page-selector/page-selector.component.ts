import { Component, Input } from '@angular/core';

@Component({
  selector: 'ms-page-selector',
  styleUrls: ['page-selector.component.scss'],
  templateUrl: './page-selector.component.html'
})
export class PageSelectorComponent {
  @Input() numberOfPages = 10;
  @Input() currentPage = 1;
}
