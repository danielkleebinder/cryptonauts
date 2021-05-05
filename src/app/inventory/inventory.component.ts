import {ChangeDetectionStrategy, Component, OnInit, TrackByFunction} from '@angular/core';
import {InventoryFacade} from './store';
import {Item} from './models';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent implements OnInit {

  inventory$ = this.inventoryFacade.inventory$;
  empty$ = this.inventoryFacade.inventoryEmpty$;
  tokens$ = this.inventoryFacade.tokens$;

  // Improve performance by using a tracking function
  trackByItemId: TrackByFunction<Item> = (index, item) => item.id;

  constructor(private inventoryFacade: InventoryFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.inventoryFacade.loadInventory();
    this.inventoryFacade.loadTokens();
  }

  upgradeItem(itemId: number): void {
    this.inventoryFacade.upgradeItem(itemId);
  }

  destroyItem(itemId: number): void {
    this.inventoryFacade.destroyItem(itemId);
  }
}
