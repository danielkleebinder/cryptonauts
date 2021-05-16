import {Inject, Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Web3 from 'web3';

import {WEB3} from '../core/tokens/web3.token';
import {BlockchainService} from '../core/services/blockchain.service';
import {Astronaut, AstronautSpecialization} from './models';


@Injectable({
  providedIn: 'root'
})
export class AstronautService {

  private readonly astronautLevelUpEvent = 'AstronautLevelUp(address,uint32)';

  readonly levelUpEvent$ = this.blockchain.createTopicObservable({name: this.astronautLevelUpEvent});


  constructor(@Inject(WEB3) private web3: Web3,
              private blockchain: BlockchainService) {
  }

  /**
   * Returns all astronauts (i.e. players).
   */
  getAstronauts(): Observable<Astronaut[]> {
    return from(this.blockchain
      .contract.methods
      .getAstronauts()
      .call({from: this.blockchain.player})) as Observable<Astronaut[]>;
  }

  /**
   * Returns my astronaut.
   */
  getMyAstronaut(): Observable<Astronaut> {
    return from(this.blockchain
      .contract.methods
      .getAstronaut()
      .call({from: this.blockchain.player})) as Observable<Astronaut>;
  }

  /**
   * Levels up my astronaut.
   */
  levelUp(specialization: AstronautSpecialization): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .levelUpAstronaut(specialization)
      .send({
        from: this.blockchain.player,
        gas: 3_000_000
      }));
  }

  /**
   * Returns the level up cost required for my astronaut.
   */
  getLevelUpCost(): Observable<number> {
    return from(this.blockchain
      .contract.methods
      .getAstronautLevelUpCost()
      .call({from: this.blockchain.player}))
      .pipe(map(data => +data));
  }

  /**
   * Sets the level up factor. Can only be adjusted by owners.
   * @param levelUpFactor Level up factor.
   */
  setLevelUpFactor(levelUpFactor: number): Observable<any> {
    return from(this.blockchain
      .contract.methods
      .setLevelUpFactor(levelUpFactor)
      .send({
        from: this.blockchain.player,
        gas: 3_000_000
      }));
  }
}
