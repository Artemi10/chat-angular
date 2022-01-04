import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNameInputComponent } from './chat-name-input.component';

describe('ChatNameInputComponent', () => {
  let component: ChatNameInputComponent;
  let fixture: ComponentFixture<ChatNameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatNameInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatNameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
