import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstronautItemComponent } from './astronaut-item.component';

describe('AstronautItemComponent', () => {
  let component: AstronautItemComponent;
  let fixture: ComponentFixture<AstronautItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstronautItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstronautItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
