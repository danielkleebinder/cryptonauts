import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AstronautState} from './astronaut.state';

import * as actions from './astronaut.actions';
import * as queries from './astronaut.selectors';
import {AstronautSpecialization} from "../models";


@Injectable()
export class AstronautFacade {

  astronauts$ = this.store.select(queries.selectAstronauts);
  astronautCount$ = this.store.select(queries.selectAstronautCount);
  me$ = this.store.select(queries.selectMe);
  levelUpCost$ = this.store.select(queries.selectLevelUpCost);

  constructor(private store: Store<AstronautState>) {
  }

  loadAstronauts(): void {
    this.store.dispatch(actions.loadAstronauts());
  }

  levelUp(specialization: AstronautSpecialization): void {
    this.store.dispatch(actions.levelUp({specialization}));
  }

  loadLevelUpCost(): void {
    this.store.dispatch(actions.loadLevelUpCost());
  }

  loadMyAstronaut(): void {
    this.store.dispatch(actions.loadMyAstronaut());
  }

  setLevelUpFactor(levelUpFactor: number): void {
    this.store.dispatch(actions.setLevelUpFactor({levelUpFactor}));
  }
}
