import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChatFormComponent } from './update-chat-form.component';

describe('UpdateChatFormComponent', () => {
  let component: UpdateChatFormComponent;
  let fixture: ComponentFixture<UpdateChatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateChatFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
