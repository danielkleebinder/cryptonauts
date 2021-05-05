import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetTokensFoundComponent } from './planet-tokens-found.component';

describe('PlanetTokensFoundComponent', () => {
  let component: PlanetTokensFoundComponent;
  let fixture: ComponentFixture<PlanetTokensFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetTokensFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetTokensFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
