import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {MarketState} from './market.state';

import * as actions from './market.actions';
import * as queries from './market.selectors';

import {Item} from '../../inventory/models';


@Injectable()
export class MarketFacade {

  market$ = this.store.select(queries.selectMarket);
  marketEmpty$ = this.store.select(queries.selectMarketEmpty);

  constructor(private store: Store<MarketState>) {
  }

  loadMarket(): void {
    this.store.dispatch(actions.loadMarket());
  }

  addItemType(newItem: Partial<Item>): void {
    this.store.dispatch(actions.addItemType({newItem}));
  }

  buyItem(itemTypeId: number): void {
    this.store.dispatch(actions.buyItem({itemTypeId}));
  }
}
