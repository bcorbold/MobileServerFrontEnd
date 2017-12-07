import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccountInfoModule } from './components/account-info/account-info.module';
import { IncomingBatchesModule } from './components/incoming-batches/incoming-batches.module';
import { PlaceOrderModule } from './components/place-order/place-order.module';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';


describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AccountInfoModule,
        BrowserAnimationsModule,
        BrowserModule,
        IncomingBatchesModule,
        PlaceOrderModule
      ],
      providers: [
        AppConfig
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
