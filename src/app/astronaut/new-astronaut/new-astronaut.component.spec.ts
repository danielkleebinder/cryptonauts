import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAstronautComponent } from './new-astronaut.component';

describe('NewAstronautComponent', () => {
  let component: NewAstronautComponent;
  let fixture: ComponentFixture<NewAstronautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAstronautComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAstronautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
