import { async, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PageSelectorComponent } from './page-selector.component';


describe('PageSelector', () => {

  let fixture;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageSelectorComponent
      ],
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatSlideToggleModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSelectorComponent);
    app = fixture.debugElement.componentInstance;
  });

  // todo: These were commented out since they used the POCForm which is no longer in the project
  // it ('should initialize the component with 5 numbers', () => {
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.queryAll(By.css('.page-numbers')).length).toBe(9);
  // });
  //
  // it ('can show 1 page', () => {
  //   app.numberOfPages = 1;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.queryAll(By.css('.page-numbers')).length).toBe(5);
  // });
  //
  // it ('can show 2 pages', () => {
  //   app.numberOfPages = 2;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.queryAll(By.css('.page-numbers')).length).toBe(6);
  // });
  //
  // it ('can show 3 pages', () => {
  //   app.numberOfPages = 3;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.queryAll(By.css('.page-numbers')).length).toBe(7);
  // });
  //
  // it ('can show 4 pages', () => {
  //   app.numberOfPages = 4;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.queryAll(By.css('.page-numbers')).length).toBe(8);
  // });
  //
  // it ('can show 5 pages', () => {
  //   app.numberOfPages = 5;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.queryAll(By.css('.page-numbers')).length).toBe(9);
  // });
  //
  // it ('shows 5 pages when the number of pages is set higher than 5', () => {
  //   app.numberOfPages = 20;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.queryAll(By.css('.page-numbers')).length).toBe(9);
  // });
  //
  // it ('emits when a button is clicked', () => {
  //   spyOn(app.newPage, 'emit');
  //   app.numberOfPages = 20;
  //   fixture.detectChanges();
  //   fixture.debugElement.queryAll(By.css('.page-numbers'))[5].nativeElement.click();
  //   fixture.detectChanges();
  //   expect(app.newPage.emit).toHaveBeenCalledWith(4);
  // });
  //
  // it ('shifts the pages being shown when a new page is selected', () => {
  //   spyOn(app.newPage, 'emit');
  //   app.numberOfPages = 20;
  //   fixture.detectChanges();
  //   let elements = fixture.debugElement.queryAll(By.css('.page-numbers'));
  //   expect(elements[2].nativeElement.innerText).toBe('1');
  //   expect(elements[3].nativeElement.innerText).toBe('2');
  //   expect(elements[4].nativeElement.innerText).toBe('3');
  //   expect(elements[5].nativeElement.innerText).toBe('4');
  //   expect(elements[6].nativeElement.innerText).toBe('5');
  //   fixture.debugElement.queryAll(By.css('.page-numbers'))[6].nativeElement.click();
  //   fixture.detectChanges();
  //   elements = fixture.debugElement.queryAll(By.css('.page-numbers'));
  //   expect(elements[2].nativeElement.innerText).toBe('3');
  //   expect(elements[3].nativeElement.innerText).toBe('4');
  //   expect(elements[4].nativeElement.innerText).toBe('5');
  //   expect(elements[5].nativeElement.innerText).toBe('6');
  //   expect(elements[6].nativeElement.innerText).toBe('7');
  // });

});
