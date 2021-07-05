import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AdminState} from './admin.state';

import * as actions from './admin.actions';
import * as queries from './admin.selectors';

import {Item} from '../../inventory/models';


@Injectable()
export class AdminFacade {

  contractBalance$ = this.store.select(queries.selectContractBalance);
  isOwner$ = this.store.select(queries.selectIsOwner);

  constructor(private store: Store<AdminState>) {
  }

  addOwner(address: string): void {
    this.store.dispatch(actions.addOwner({address}));
  }

  renounceOwner(): void {
    this.store.dispatch(actions.renounceOwner());
  }

  redeemEther(): void {
    this.store.dispatch(actions.redeemEther());
  }

  setMaxItemLevel(maxItemLevel: number): void {
    this.store.dispatch(actions.setMaxItemLevel({maxItemLevel}));
  }

  setMaxEquipmentCount(maxEquipmentCount: number): void {
    this.store.dispatch(actions.setMaxEquipmentCount({maxEquipmentCount}));
  }

  setTokenPrice(tokenPrice: number): void {
    this.store.dispatch(actions.setTokenPrice({tokenPrice}));
  }

  setLevelUpFactor(levelUpFactor: number): void {
    this.store.dispatch(actions.setLevelUpFactor({levelUpFactor}));
  }

  setTravelTime(travelTime: number): void {
    this.store.dispatch(actions.setTravelTime({travelTime}));
  }

  addItemType(newItem: Partial<Item>): void {
    this.store.dispatch(actions.addItemType({newItem}));
  }

  loadContractBalance(): void {
    this.store.dispatch(actions.loadContractBalance());
  }

  loadOwnership(): void {
    this.store.dispatch(actions.loadOwnership());
  }
}
