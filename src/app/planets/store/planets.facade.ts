import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {PlanetsState} from './planets.state';

import * as actions from './planets.actions';
import * as queries from './planets.selectors';


@Injectable()
export class PlanetsFacade {

  planets$ = this.store.select(queries.selectAllPlanets);
  travelTime$ = this.store.select(queries.selectTravelTime);
  myExploration$ = this.store.select(queries.selectMyExploration);

  activePlanet$ = this.store.select(queries.selectActivePlanet);
  hasActivePlanet$ = this.store.select(queries.selectHasActivePlanet);

  constructor(private store: Store<PlanetsState>) {
  }

  loadPlanets(): void {
    this.store.dispatch(actions.loadPlanets());
  }

  loadExplorerCount(planetId: number): void {
    this.store.dispatch(actions.loadExplorerCount({planetId}));
  }

  loadMyExploration(): void {
    this.store.dispatch(actions.loadMyExploration());
  }

  selectPlanet(planetId: number): void {
    this.store.dispatch(actions.selectPlanet({planetId}));
  }

  leavePlanet(): void {
    this.store.dispatch(actions.leavePlanet());
  }

  explorePlanet(planetId: number): void {
    this.store.dispatch(actions.explorePlanet({planetId}));
  }
}
