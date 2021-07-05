import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstronautFiltersComponent } from './astronaut-filters.component';

describe('AstronautFiltersComponent', () => {
  let component: AstronautFiltersComponent;
  let fixture: ComponentFixture<AstronautFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstronautFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstronautFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
