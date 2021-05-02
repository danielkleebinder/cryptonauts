import {Inject, Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import Web3 from 'web3';

import {WEB3} from '../core/tokens/web3.token';
import {BlockchainService} from '../core/services/blockchain.service';
import {Planet, PlanetExploration} from './models';


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

  /**
   * The player leaves the planet.
   */
  leavePlanet(): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .leavePlanet()
      .send({from: this.blockchain.player})) as Observable<any>;
  }

  /**
   * Start exploring the given planet.
   * @param planetId Planet.
   */
  explorePlanet(planetId): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .explorePlanet(planetId)
      .send({from: this.blockchain.player, gas: 300_000})) as Observable<any>;
  }

  /**
   * Returns the current number of explorers on a given planet.
   * @param planetId Planet.
   */
  getExplorerCount(planetId: number): Observable<number> {
    return from(this.blockchain
      .contract.methods
      .explorerCount(planetId)
      .call()) as Observable<number>;
  }

  /**
   * Returns my current exploration status.
   */
  getMyExploration(): Observable<PlanetExploration> {
    return from(this.blockchain
      .contract.methods
      .getMyExploration()
      .call()) as Observable<PlanetExploration>;
  }
}
