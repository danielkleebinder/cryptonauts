import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminFacade} from '../store';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private adminFacade: AdminFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemMining: [0, Validators.compose([Validators.required, Validators.min(0)])],
      itemAttack: [0, Validators.compose([Validators.required, Validators.min(0)])],
      itemDefense: [0, Validators.compose([Validators.required, Validators.min(0)])],
      itemCost: [0, Validators.compose([Validators.required, Validators.min(0)])]
    });
  }

  /**
   * Creates the item type.
   */
  createItem(): void {
    const val = this.formGroup.getRawValue();
    this.adminFacade.addItemType({
      name: val.itemName,
      mining: +val.itemMining,
      attack: +val.itemAttack,
      defense: +val.itemDefense,
      cost: +val.itemCost,
    });
  }

}
