import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminFacade} from '../store';

@Component({
  selector: 'app-change-max-item-level',
  templateUrl: './change-max-item-level.component.html',
  styleUrls: ['./change-max-item-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeMaxItemLevelComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private adminFacade: AdminFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      maxItemLevel: [null, Validators.required]
    });
  }

  /**
   * Sets the new max item level.
   */
  save(): void {
    const {maxItemLevel} = this.formGroup.getRawValue();
    this.adminFacade.setMaxItemLevel(maxItemLevel);
  }
}
