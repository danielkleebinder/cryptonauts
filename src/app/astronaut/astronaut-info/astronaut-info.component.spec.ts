import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstronautInfoComponent } from './astronaut-info.component';

describe('AstronautInfoComponent', () => {
  let component: AstronautInfoComponent;
  let fixture: ComponentFixture<AstronautInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstronautInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstronautInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
