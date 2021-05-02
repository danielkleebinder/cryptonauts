import {createAction, props} from '@ngrx/store';
import {Planet} from '../models';


// Core planet actions
export const loadPlanets = createAction('[Planets Page] Load planets');
export const loadPlanetsSuccess = createAction('[Planets API] Load planets success', props<{ planets: Planet[] }>());
export const clearPlanets = createAction('[Planets Page] Clear planets');

// Planet exploration actions
export const leavePlanet = createAction('[Planets Page] Leave planet');
export const explorePlanet = createAction('[Planets Page] Start planet exploration', props<{ planetId: number }>());
export const collectMinedResources = createAction('[Planets Page] Collect mined resourced');

// Only owner actions
export const setTravelTime = createAction('[Admin Page] Set travel time', props<{ travelTime: number }>());
export const loadTravelTime = createAction('[Planets Page] Load travel time');
export const loadTravelTimeSuccess = createAction('[Planets API] Load travel time success', props<{ travelTime: number }>());
