import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { AppConfig } from '../../app.config';
import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AppConfig,
        MessageService
      ]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

});
