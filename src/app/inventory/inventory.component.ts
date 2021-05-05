import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {InventoryFacade} from './store';

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

  constructor(private inventoryFacade: InventoryFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.inventoryFacade.loadInventory();
    this.inventoryFacade.loadTokens();
  }

}
