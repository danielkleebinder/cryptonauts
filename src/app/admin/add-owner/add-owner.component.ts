import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminFacade} from '../store';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOwnerComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private adminFacade: AdminFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      address: ['', Validators.required]
    });
  }

  /**
   * Adds the owner entered.
   */
  addOwner(): void {
    const {address} = this.formGroup.getRawValue();
    this.adminFacade.addOwner(address);
  }
}
