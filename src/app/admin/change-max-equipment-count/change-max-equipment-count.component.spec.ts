import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMaxEquipmentCountComponent } from './change-max-equipment-count.component';

describe('ChangeMaxEquipmentCountComponent', () => {
  let component: ChangeMaxEquipmentCountComponent;
  let fixture: ComponentFixture<ChangeMaxEquipmentCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMaxEquipmentCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMaxEquipmentCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
