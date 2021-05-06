import {EntityState} from '@ngrx/entity';
import {Astronaut} from '../models';

export interface AstronautState extends EntityState<Astronaut> {
  me: Astronaut;
  levelUpCost: number;
}
