import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminFacade} from '../store';

@Component({
  selector: 'app-change-travel-time',
  templateUrl: './change-travel-time.component.html',
  styleUrls: ['./change-travel-time.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeTravelTimeComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private adminFacade: AdminFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      travelTime: [null, Validators.required]
    });
  }

  /**
   * Sets the new travel time between planets.
   */
  save(): void {
    const {travelTime} = this.formGroup.getRawValue();
    this.adminFacade.setTravelTime(travelTime);
  }
}
