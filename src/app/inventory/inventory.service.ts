import {Inject, Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import Web3 from 'web3';

import {WEB3} from '../core/tokens/web3.token';
import {BlockchainService} from '../core/services/blockchain.service';
import {Item} from './models';
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(@Inject(WEB3) private web3: Web3,
              private blockchain: BlockchainService) {
  }

  /**
   * Returns the inventory of the currently logged in user.
   */
  getInventory(): Observable<Item[]> {
    return from(this.blockchain
      .contract.methods
      .getItemsByOwner(this.blockchain.player)
      .call({from: this.blockchain.player})) as Observable<Item[]>;
  }

  /**
   * Returns the balance of the currently logged in user.
   */
  getBalance(): Observable<number> {
    return from(this.blockchain
      .contract.methods
      .balanceOf(this.blockchain.player)
      .call({from: this.blockchain.player}))
      .pipe(map(data => +data));
  }

  /**
   * Upgrades the item with the given ID.
   */
  upgradeItem(itemId: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .levelUpItem(itemId)
      .send({
        from: this.blockchain.player,
        gas: 3_000_000
      }));
  }

  /**
   * Destroy the item with the given ID.
   */
  destroyItem(itemId: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .destroyItem(itemId)
      .send({
        from: this.blockchain.player,
        gas: 3_000_000
      }));
  }
}
