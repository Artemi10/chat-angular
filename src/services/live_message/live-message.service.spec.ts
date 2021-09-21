import { TestBed } from '@angular/core/testing';

import { LiveMessageService } from './live-message.service';

describe('LiveMessageService', () => {
  let service: LiveMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
