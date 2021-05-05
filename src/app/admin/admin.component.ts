import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MarketFacade} from '../market/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  itemFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private marketFacade: MarketFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.itemFormGroup = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemMining: [0, Validators.compose([Validators.required, Validators.min(0)])],
      itemAttack: [0, Validators.compose([Validators.required, Validators.min(0)])],
      itemDefense: [0, Validators.compose([Validators.required, Validators.min(0)])],
      itemCost: [0, Validators.compose([Validators.required, Validators.min(0)])]
    });
  }

  createItem(): void {
    const val = this.itemFormGroup.getRawValue();
    this.marketFacade.addItemType({
      name: val.itemName,
      mining: +val.itemMining,
      attack: +val.itemAttack,
      defense: +val.itemDefense,
      cost: +val.itemCost,
    });
    this.itemFormGroup.reset();
  }
}
