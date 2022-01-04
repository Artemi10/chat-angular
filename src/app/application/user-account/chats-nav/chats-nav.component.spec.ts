import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsNavComponent } from './chats-nav.component';

describe('ChatsNavComponent', () => {
  let component: ChatsNavComponent;
  let fixture: ComponentFixture<ChatsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
