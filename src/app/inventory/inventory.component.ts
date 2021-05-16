import {ChangeDetectionStrategy, Component, OnInit, TrackByFunction} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InventoryFacade} from './store';
import {Item} from './models';
import {BuyTokensComponent} from './buy-tokens/buy-tokens.component';

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

  constructor(private inventoryFacade: InventoryFacade,
              private dialog: MatDialog) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.inventoryFacade.loadInventory();
    this.inventoryFacade.loadTokens();
  }

  buyTokens(): void {
    this.dialog.open(BuyTokensComponent, {width: '400px'});
  }
}
