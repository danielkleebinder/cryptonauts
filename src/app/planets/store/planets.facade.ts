import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {PlanetsState} from './planets.state';

import * as actions from './planets.actions';
import * as queries from './planets.selectors';


@Injectable()
export class PlanetsFacade {

  planets$ = this.store.select(queries.selectAllPlanets);

  constructor(private store: Store<PlanetsState>) {
  }

  loadPlanets(): void {
    this.store.dispatch(actions.loadPlanets());
  }
}
