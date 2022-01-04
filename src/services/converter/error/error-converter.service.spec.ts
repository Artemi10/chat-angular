import { TestBed } from '@angular/core/testing';

import { ErrorConverterService } from './error-converter.service';

describe('ErrorConverterService', () => {
  let service: ErrorConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
