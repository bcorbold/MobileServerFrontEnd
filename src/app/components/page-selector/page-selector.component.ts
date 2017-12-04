import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ms-page-selector',
  styleUrls: ['page-selector.component.scss'],
  templateUrl: './page-selector.component.html'
})
export class PageSelectorComponent implements OnInit {
  @Input() numberOfPages = 10;
  @Input() currentPage = 1;
  @Input() numberOfPagesToShow = 5;
  @Output() nextPage = new EventEmitter<number>();

  pages = {
    currentPage: 1,
    pagesShowing: [1, 2, 3, 4, 5]
  };

  ngOnInit() {
    const newPages = [];
    for (let i = 1; i <= this.numberOfPagesToShow; i++) {
      if (i <= this.numberOfPages) {
        newPages.push(i);
      }
    }
    this.pages.pagesShowing = newPages;
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.nextPage.emit(this.currentPage);
  }
}
