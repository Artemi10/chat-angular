import { TestBed } from '@angular/core/testing';

import { XmlChatConverter } from './xml-chat-converter.service';

describe('XmlChatConverterService', () => {
  let service: XmlChatConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlChatConverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
