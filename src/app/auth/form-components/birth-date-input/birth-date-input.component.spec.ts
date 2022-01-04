import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthDateInputComponent } from './birth-date-input.component';

describe('BirthDateInputComponent', () => {
  let component: BirthDateInputComponent;
  let fixture: ComponentFixture<BirthDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthDateInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
