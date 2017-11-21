import { TestBed, async } from '@angular/core/testing';
import { MatButtonModule, MatSlideToggleModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { POCComponentModule } from './components/poc/poc.module';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatButtonModule,
        MatSlideToggleModule,
        POCComponentModule
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
