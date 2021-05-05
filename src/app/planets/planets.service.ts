import {Inject, Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import Web3 from 'web3';

import {WEB3} from '../core/tokens/web3.token';
import {BlockchainService} from '../core/services/blockchain.service';
import {Planet, PlanetExploration} from './models';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private readonly planetExplorerArrivedEvent = 'PlanetExplorerArrived(address,uint256)';
  private readonly planetExplorerLeftEvent = 'PlanetExplorerLeft(address,uint256)';
  private readonly planetResourcesCollectedEvent = 'PlanetResourcesCollected(address,uint256)';

  readonly explorerArrivedEvent$ = this.blockchain.createTopicObservable({name: this.planetExplorerArrivedEvent});
  readonly explorerLeftEvent$ = this.blockchain.createTopicObservable({name: this.planetExplorerLeftEvent});

  readonly resourcesCollectedEvent$ = this.blockchain
    .createTopicObservable(
      {name: this.planetResourcesCollectedEvent},
      {name: this.blockchain.playerAddress256, raw: true})
    .pipe(map(({data}) => this.web3.utils.toDecimal(data)));


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
      .call({from: this.blockchain.player})) as Observable<Planet[]>;
  }

  /**
   * Collects the mined resources so far.
   */
  collectMinedResources(): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .collectMinedPlanetResources()
      .send({from: this.blockchain.player})) as Observable<any>;
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
   * Returns my current exploration status.
   */
  getMyExploration(): Observable<PlanetExploration> {
    return from(this.blockchain
      .contract.methods
      .getMyExploration()
      .call({from: this.blockchain.player})) as Observable<PlanetExploration>;
  }
}
