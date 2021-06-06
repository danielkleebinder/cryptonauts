import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTravelTimeComponent } from './change-travel-time.component';

describe('ChangeTravelTimeComponent', () => {
  let component: ChangeTravelTimeComponent;
  let fixture: ComponentFixture<ChangeTravelTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTravelTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTravelTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
