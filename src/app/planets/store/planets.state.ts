import {EntityState} from '@ngrx/entity';
import {Planet, PlanetExploration} from '../models';

export interface PlanetsState extends EntityState<Planet> {
  activePlanetId: number;
  travelTime: number;
  exploration: PlanetExploration;
}
