import {EntityState} from '@ngrx/entity';
import {Planet} from '../models';

export interface PlanetsState extends EntityState<Planet> {
  travelTime: number;
}
