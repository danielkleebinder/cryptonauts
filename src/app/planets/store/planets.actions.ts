import {createAction, props} from '@ngrx/store';
import {Planet, PlanetExploration} from '../models';


// Core planet actions
export const loadPlanets = createAction('[Planets Page] Load planets');
export const loadPlanetsSuccess = createAction('[Planets API] Load planets success', props<{ planets: Planet[] }>());
export const clearPlanets = createAction('[Planets Page] Clear planets');
export const selectPlanet = createAction('[Planets Page] Select planet', props<{ planetId: number }>());

// Planet exploration actions
export const leavePlanet = createAction('[Planets Page] Leave planet');
export const explorePlanet = createAction('[Planets Page] Start planet exploration', props<{ planetId: number }>());
export const collectMinedResources = createAction('[Planets Page] Collect mined resourced');
export const loadExplorerCount = createAction('[Planets Page] Load explorer count', props<{ planetId: number }>());
export const loadExplorerCountSuccess = createAction('[Planets Page] Load explorer count success', props<{ planetId: number, explorerCount: number }>());
export const loadMyExploration = createAction('[Planets Page] Load my exploration');
export const loadMyExplorationSuccess = createAction('[Planets Page] Load my exploration success', props<{ exploration: PlanetExploration }>());

// Only owner actions
export const setTravelTime = createAction('[Admin Page] Set travel time', props<{ travelTime: number }>());
export const loadTravelTime = createAction('[Planets Page] Load travel time');
export const loadTravelTimeSuccess = createAction('[Planets API] Load travel time success', props<{ travelTime: number }>());
