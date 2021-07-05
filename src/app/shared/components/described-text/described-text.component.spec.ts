import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescribedTextComponent } from './described-text.component';

describe('DescribedTextComponent', () => {
  let component: DescribedTextComponent;
  let fixture: ComponentFixture<DescribedTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescribedTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescribedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
