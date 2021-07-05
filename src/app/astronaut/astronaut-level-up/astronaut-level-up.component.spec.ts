import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstronautLevelUpComponent } from './astronaut-level-up.component';

describe('AstronautLevelUpComponent', () => {
  let component: AstronautLevelUpComponent;
  let fixture: ComponentFixture<AstronautLevelUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstronautLevelUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstronautLevelUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
