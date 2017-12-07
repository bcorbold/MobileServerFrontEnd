import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ms-page-selector',
  styleUrls: ['page-selector.component.scss'],
  templateUrl: './page-selector.component.html'
})
export class PageSelectorComponent implements OnInit {
  @Input() numberOfPages = 10;
  _currentPage = 1;
  @Input() set currentPage(newPage: number) {
    this._currentPage = newPage;
    this.updateShownPages();
  }
  @Output() newPage = new EventEmitter<number>();

  pagesShowing = [1, 2, 3, 4, 5];

  ngOnInit() {
    this.updateShownPages();
  }

  changePage(newPage: number) {
    if (newPage < 1) {
      newPage = 1;
    } else if (newPage > this.numberOfPages) {
      newPage = this.numberOfPages;
    }
    this._currentPage = newPage;
    this.newPage.emit(this._currentPage);
    this.updateShownPages();
  }

  updateShownPages() {
    if (this._currentPage <= 3) {
      const newPages = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= this.numberOfPages) {
          newPages.push(i);
        }
      }
      this.pagesShowing = newPages;
    } else if (this._currentPage > this.numberOfPages - 3) {
      const newPages = [];
      for (let i = this.numberOfPages; i > this.numberOfPages - 5; i--) {
        if (i <= this.numberOfPages) {
          newPages.push(i);
        }
      }
      this.pagesShowing = newPages.reverse();
    } else {
      const newPages = [];
      newPages.push(this._currentPage - 2);
      newPages.push(this._currentPage - 1);
      newPages.push(this._currentPage);
      newPages.push(this._currentPage + 1);
      newPages.push(this._currentPage + 2);
      this.pagesShowing = newPages;
    }
  }
}
