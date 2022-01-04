import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChatPopUpComponent } from './update-chat-pop-up.component';

describe('UpdateChatPopUpComponent', () => {
  let component: UpdateChatPopUpComponent;
  let fixture: ComponentFixture<UpdateChatPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateChatPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChatPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
