import { TestBed, async } from '@angular/core/testing';
import { MatButtonModule, MatSlideToggleModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { MessageModule, MessageService } from './services/message/message.module';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatButtonModule,
        MatSlideToggleModule,
        MessageModule
      ],
      providers: [
        AppConfig,
        MessageService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
