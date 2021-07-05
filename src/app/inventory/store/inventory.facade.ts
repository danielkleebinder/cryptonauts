import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {InventoryState} from './inventory.state';

import * as actions from './inventory.actions';
import * as queries from './inventory.selectors';


@Injectable()
export class InventoryFacade {

  inventory$ = this.store.select(queries.selectInventory);
  inventoryEmpty$ = this.store.select(queries.selectInventoryEmpty);
  tokens$ = this.store.select(queries.selectTokens);
  tokenPrice$ = this.store.select(queries.selectTokenPrice);
  playerBalance$ = this.store.select(queries.selectPlayerBalance);

  constructor(private store: Store<InventoryState>) {
  }

  loadInventory(): void {
    this.store.dispatch(actions.loadInventory());
  }

  loadPlayerBalance(): void {
    this.store.dispatch(actions.loadPlayerBalance());
  }

  buyTokens(wei: number): void {
    this.store.dispatch(actions.buyTokens({wei}));
  }

  loadTokenPrice(): void {
    this.store.dispatch(actions.loadTokenPrice());
  }

  loadTokens(): void {
    this.store.dispatch(actions.loadTokens());
  }

  upgradeItem(itemId: number): void {
    this.store.dispatch(actions.upgradeItem({itemId}));
  }

  destroyItem(itemId: number): void {
    this.store.dispatch(actions.destroyItem({itemId}));
  }

  equipItem(itemId: number): void {
    this.store.dispatch(actions.equipItem({itemId}));
  }

  unequipItem(itemId: number): void {
    this.store.dispatch(actions.unequipItem({itemId}));
  }
}
