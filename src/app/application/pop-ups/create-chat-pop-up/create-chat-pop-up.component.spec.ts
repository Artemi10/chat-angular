import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChatPopUpComponent } from './create-chat-pop-up.component';

describe('CreateChatPopUpComponent', () => {
  let component: CreateChatPopUpComponent;
  let fixture: ComponentFixture<CreateChatPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChatPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChatPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
