import {Inject, Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import Web3 from 'web3';

import {WEB3} from '../core/tokens/web3.token';
import {BlockchainService} from '../core/services/blockchain.service';
import {Item} from '../inventory/models';


@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(@Inject(WEB3) private web3: Web3,
              private blockchain: BlockchainService) {
  }

  /**
   * Returns the entire market.
   */
  getMarket(): Observable<Item[]> {
    return from(this.blockchain
      .contract.methods
      .getItemTypes()
      .call({from: this.blockchain.player})) as Observable<Item[]>;
  }

  /**
   * Creates and adds a completely new item type.
   * @param name Items name.
   * @param mining Mining power.
   * @param attack Attack power.
   * @param defense Defense power.
   * @param cost Cost.
   */
  addItemType(name: string, mining: number, attack: number, defense: number, cost: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .createItemType(name, mining, attack, defense, cost)
      .send({
        from: this.blockchain.player,
        gas: 3_000_000
      })) as Observable<any>;
  }

  /**
   * Buys the item with the given item ID.
   * @param itemTypeId Item type ID.
   */
  buyItem(itemTypeId: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .buyItem(itemTypeId)
      .send({
        from: this.blockchain.player,
        gas: 3_000_000
      })) as Observable<any>;
  }
}
