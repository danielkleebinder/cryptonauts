import {Inject, Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
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
      .getItemsByOwner('0x' + this.blockchain.player)
      .call()) as Observable<Item[]>;
  }

  /**
   * Returns the balance of the currently logged in user.
   */
  getBalance(): Observable<number> {
    return from(this.blockchain
      .contract.methods
      .balanceOf('0x' + this.blockchain.player)
      .call()) as Observable<number>;
  }
}
