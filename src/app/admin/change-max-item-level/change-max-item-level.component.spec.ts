import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMaxItemLevelComponent } from './change-max-item-level.component';

describe('ChangeMaxItemLevelComponent', () => {
  let component: ChangeMaxItemLevelComponent;
  let fixture: ComponentFixture<ChangeMaxItemLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMaxItemLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMaxItemLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
