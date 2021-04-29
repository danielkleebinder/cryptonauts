import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceHangerComponent } from './space-hanger.component';

describe('SpaceHangerComponent', () => {
  let component: SpaceHangerComponent;
  let fixture: ComponentFixture<SpaceHangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceHangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceHangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
