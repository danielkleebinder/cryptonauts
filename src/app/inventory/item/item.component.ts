import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Item} from '../models';
import {InventoryFacade} from '../store';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {

  @Input() item: Item;

  constructor(private inventoryFacade: InventoryFacade) {
  }

  equipItem(itemId: number): void {
    this.inventoryFacade.equipItem(itemId);
  }

  unequipItem(itemId: number): void {
    this.inventoryFacade.unequipItem(itemId);
  }

  upgradeItem(itemId: number): void {
    this.inventoryFacade.upgradeItem(itemId);
  }

  destroyItem(itemId: number): void {
    this.inventoryFacade.destroyItem(itemId);
  }
}
