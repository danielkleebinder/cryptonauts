import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {InventoryState} from './inventory.state';

import * as actions from './inventory.actions';
import * as queries from './inventory.selectors';


@Injectable()
export class InventoryFacade {

  inventory$ = this.store.select(queries.selectInventory);
  tokens$ = this.store.select(queries.selectTokens);

  constructor(private store: Store<InventoryState>) {
  }

  loadTokens(): void {
    this.store.dispatch(actions.loadTokens());
  }
}
