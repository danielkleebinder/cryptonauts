import {Inject, Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Web3 from 'web3';

import {WEB3} from '../core/tokens/web3.token';
import {BlockchainService} from '../core/services/blockchain.service';
import {Item} from './models';


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
   * Buys tokens for the given wei amount.
   */
  buyTokens(wei: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .buyTokens()
      .send({
        from: this.blockchain.player,
        gas: 3_000_000,
        value: wei
      }));
  }

  /**
   * Returns the current token price.
   */
  getTokenPrice(): Observable<number> {
    return from(this.blockchain
      .contract.methods
      .tokenPrice()
      .call({from: this.blockchain.player}))
      .pipe(map(data => +data));
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
      .upgradeItem(itemId)
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

  /**
   * Equips the item with the given id.
   */
  equip(itemId: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .equip(itemId)
      .send({
        from: this.blockchain.player,
        gas: 3_000_000
      }));
  }

  /**
   * Unequips the item with the given id.
   */
  unequip(itemId: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .unequip(itemId)
      .send({
        from: this.blockchain.player,
        gas: 3_000_000
      }));
  }

  /**
   * Returns the balance on the current player.
   */
  getPlayerBalance(): Observable<number> {
    return from(this.web3.eth.getBalance(this.blockchain.player))
      .pipe(
        map(data => this.web3.utils.fromWei(data, 'ether')),
        map(data => +data));
  }
}
