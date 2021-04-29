import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetInfoComponent } from './planet-info.component';

describe('PlanetInfoComponent', () => {
  let component: PlanetInfoComponent;
  let fixture: ComponentFixture<PlanetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
