import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { POCComponentModule } from './components/poc/poc.module';
import { POCFormModule } from './forms/poc/poc-form.module';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        POCComponentModule,
        POCFormModule
      ],
      providers: [
        AppConfig,
        POCComponentModule
      ]
    }).compileComponents();
  }));

  it ('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

});
