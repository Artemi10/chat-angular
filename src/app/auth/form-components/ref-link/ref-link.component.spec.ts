import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefLinkComponent } from './ref-link.component';

describe('RefLinkComponent', () => {
  let component: RefLinkComponent;
  let fixture: ComponentFixture<RefLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
