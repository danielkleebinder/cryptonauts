import {Inject, Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import Web3 from 'web3';

import {WEB3} from '../core/tokens/web3.token';
import {BlockchainService} from '../core/services/blockchain.service';
import {Planet} from './models';


@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(@Inject(WEB3) private web3: Web3,
              private blockchain: BlockchainService) {
  }

  /**
   * Loads all planets that are available to the player.
   */
  getPlanets(): Observable<Planet[]> {
    return from(this.blockchain
      .contract.methods
      .getPlanets()
      .call()) as Observable<Planet[]>;
  }

  leavePlanet(): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .leavePlanet()
      .send({from: this.blockchain.player})) as Observable<any>;
  }
}
