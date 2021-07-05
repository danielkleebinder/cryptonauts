import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstronautComponent } from './astronaut.component';

describe('AstronautComponent', () => {
  let component: AstronautComponent;
  let fixture: ComponentFixture<AstronautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstronautComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstronautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
