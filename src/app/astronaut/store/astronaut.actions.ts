import {createAction, props} from '@ngrx/store';
import {Astronaut, AstronautSpecialization} from '../models';


export const loadAstronauts = createAction('[Astronaut Page] Load astronauts');
export const loadAstronautsSuccess = createAction('[Astronaut API] Load astronauts success', props<{ astronauts: Astronaut[] }>());
export const clearAstronauts = createAction('[Astronaut Page] Clear astronauts');

export const levelUp = createAction('[Astronaut Page] Level up my astronaut', props<{ specialization: AstronautSpecialization }>());
export const levelUpSuccess = createAction('[Astronaut API] Level up my astronaut success');

export const loadLevelUpCost = createAction('[Astronaut Page] Load level up cost');
export const loadLevelUpCostSuccess = createAction('[Astronaut API]  Load level up cost success', props<{ levelUpCost: number }>());

export const loadMyAstronaut = createAction('[Astronaut Page] Load my astronaut');
export const loadMyAstronautSuccess = createAction('[Astronaut API] Load my astronaut success', props<{ me: Astronaut }>());

export const setLevelUpFactor = createAction('[Admin Page] Set level up factor', props<{ levelUpFactor: number }>());
