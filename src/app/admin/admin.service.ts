import {Inject, Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Web3 from 'web3';
import {WEB3} from '../core/tokens/web3.token';
import {BlockchainService} from '../core/services/blockchain.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(@Inject(WEB3) private web3: Web3,
              private blockchain: BlockchainService) {
  }

  /**
   * Adds a new owner.
   */
  addOwner(address: string): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .addOwner(address)
      .send({from: this.blockchain.player, gas: 3_000_000}));
  }

  /**
   * Renounces my ownership.
   */
  renounceOwner(): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .renounceOwner()
      .send({from: this.blockchain.player, gas: 3_000_000}));
  }

  /**
   * Sets a new token price in wei.
   */
  setTokenPrice(tokenPriceInWei: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .setTokenPrice(tokenPriceInWei)
      .send({from: this.blockchain.player, gas: 3_000_000}));
  }

  /**
   * Sets the max allowed item level that players can archive.
   */
  setMaxItemLevel(maxItemLevel: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .setMaxItemLevel(maxItemLevel)
      .send({from: this.blockchain.player, gas: 3_000_000}));
  }

  /**
   * Sets the max amount of simultaneously equipped items.
   */
  setMaxEquipmentCount(maxEquipmentCount: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .setMaxEquipmentCount(maxEquipmentCount)
      .send({from: this.blockchain.player, gas: 3_000_000}));
  }

  /**
   * Redeems the ether on the game contract.
   */
  redeemEther(): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .redeem()
      .send({from: this.blockchain.player, gas: 3_000_000}));
  }

  /**
   * Sets the level up factor. Can only be adjusted by owners.
   * @param levelUpFactor Level up factor.
   */
  setLevelUpFactor(levelUpFactor: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .setLevelUpFactor(levelUpFactor)
      .send({from: this.blockchain.player, gas: 3_000_000}));
  }

  /**
   * Sets the required travel time. Can only be used by owners.
   * @param travelTime Required travel time between planets in seconds.
   */
  setTravelTime(travelTime: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .setRequiredTravelTime(travelTime)
      .send({from: this.blockchain.player, gas: 300_000}));
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
      }));
  }

  /**
   * Returns the balance on the contract.
   */
  getGameContractBalance(): Observable<number> {
    return from(this.web3.eth.getBalance(this.blockchain.getCryptoverseContractAddress()))
      .pipe(
        map(data => this.web3.utils.fromWei(data, 'ether')),
        map(data => +data));
  }

  /**
   * Checks if the current player is an owner.
   */
  isOwner(): Observable<boolean> {
    return from(this.blockchain
      .contract.methods
      .isOwner()
      .call({from: this.blockchain.player}))
      .pipe(map(res => !!res));
  }
}
