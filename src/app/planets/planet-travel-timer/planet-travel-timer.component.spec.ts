import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetTravelTimerComponent } from './planet-travel-timer.component';

describe('PlanetTravelTimerComponent', () => {
  let component: PlanetTravelTimerComponent;
  let fixture: ComponentFixture<PlanetTravelTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetTravelTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetTravelTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
