import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminFacade} from '../store';

@Component({
  selector: 'app-change-max-equipment-count',
  templateUrl: './change-max-equipment-count.component.html',
  styleUrls: ['./change-max-equipment-count.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeMaxEquipmentCountComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private adminFacade: AdminFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      maxEquipmentCount: [null, Validators.required]
    });
  }

  /**
   * Sets the new max equipment count.
   */
  save(): void {
    const {maxEquipmentCount} = this.formGroup.getRawValue();
    this.adminFacade.setMaxEquipmentCount(maxEquipmentCount);
  }
}
