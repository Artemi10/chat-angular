import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasswordInputComponent } from './repassword-input.component';

describe('RepasswordInputComponent', () => {
  let component: RepasswordInputComponent;
  let fixture: ComponentFixture<RepasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepasswordInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
