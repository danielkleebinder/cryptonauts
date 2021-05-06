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
      .send({from: this.blockchain.player}));
  }

  /**
   * The player leaves the planet.
   */
  leavePlanet(): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .leavePlanet()
      .send({from: this.blockchain.player}));
  }

  /**
   * Start exploring the given planet.
   * @param planetId Planet.
   */
  explorePlanet(planetId): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .explorePlanet(planetId)
      .send({from: this.blockchain.player, gas: 300_000}));
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
   * Returns the required travel time.
   */
  getTravelTime(): Observable<number> {
    return from(this.blockchain
      .contract.methods
      .requiredTravelTime()
      .call({from: this.blockchain.player}))
      .pipe(map(data => +data));
  }
}
