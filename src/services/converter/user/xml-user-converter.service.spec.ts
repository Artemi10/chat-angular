import { TestBed } from '@angular/core/testing';

import { XmlUserConverter } from './xml-user-converter.service';

describe('XmlUserConverterService', () => {
  let service: XmlUserConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlUserConverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
