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

  loadMyExploration(): void {
    this.store.dispatch(actions.loadMyExploration());
  }

  selectPlanet(planetId: number): void {
    this.store.dispatch(actions.selectPlanet({planetId}));
  }

  collectMinedResources(): void {
    this.store.dispatch(actions.collectMinedResources());
  }

  leavePlanet(): void {
    this.store.dispatch(actions.leavePlanet());
  }

  explorePlanet(planetId: number): void {
    this.store.dispatch(actions.explorePlanet({planetId}));
  }

  loadTravelTime(): void {
    this.store.dispatch(actions.loadTravelTime());
  }
}
