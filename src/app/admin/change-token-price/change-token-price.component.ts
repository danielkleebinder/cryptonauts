import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminFacade} from '../store';

@Component({
  selector: 'app-change-token-price',
  templateUrl: './change-token-price.component.html',
  styleUrls: ['./change-token-price.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeTokenPriceComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private adminFacade: AdminFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      tokenPrice: [null, Validators.required]
    });
  }

  /**
   * Sets the new token price.
   */
  save(): void {
    const {tokenPrice} = this.formGroup.getRawValue();
    this.adminFacade.setTokenPrice(tokenPrice);
  }
}
