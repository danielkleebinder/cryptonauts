import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NotifierService} from 'angular-notifier';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, Observable} from 'rxjs';
import {catchError, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';

import * as actions from './planets.actions';
import {PlanetsService} from '../planets.service';

import {PlanetTokensFoundComponent} from '../planet-tokens-found/planet-tokens-found.component';
import {Logger} from '../../core/utils';
import {replaceErrorCodes} from '../../core/error';


@Injectable()
export class PlanetsEffects {

  private readonly log = Logger.getLogger(PlanetsEffects);

  planetExplorerArrived$ = createEffect(() => this.planetsService.explorerArrivedEvent$.pipe(map(() => actions.loadPlanets())));
  planetExplorerLeft$ = createEffect(() => this.planetsService.explorerLeftEvent$.pipe(map(() => actions.loadPlanets())));

  planetResourcesCollected$ = createEffect(() => this.planetsService.resourcesCollectedEvent$.pipe(
    tap((collectedResources) => this.notifierService.notify('success', `${collectedResources} space diamonds found`)),
    filter(collectedResources => collectedResources >= 2),
    tap(collectedResources => this.dialog.open(PlanetTokensFoundComponent, {width: '460px', data: collectedResources}))
  ), {dispatch: false});

  loadPlanets$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadPlanets),
    switchMap(() => this.planetsService
      .getPlanets()
      .pipe(
        map((planets) => actions.loadPlanetsSuccess({planets})),
        catchError(err => this.onError(err))
      ))
  ));

  loadMyExploration$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadMyExploration),
    switchMap(() => this.planetsService
      .getMyExploration()
      .pipe(
        map((exploration) => actions.loadMyExplorationSuccess({exploration})),
        catchError(err => this.onError(err))))
  ));

  selectPlanet$ = createEffect(() => this.actions$.pipe(
    ofType(actions.selectPlanet),
    distinctUntilChanged((x, y) => x.planetId === y.planetId),
    map(({planetId}) => actions.loadMyExploration())
  ));

  collectMinedResources = createEffect(() => this.actions$.pipe(
    ofType(actions.collectMinedResources),
    switchMap(() => this.planetsService
      .collectMinedResources()
      .pipe(
        map(() => actions.collectMinedResourcesSuccess()),
        catchError(err => this.onError(err))))
  ));

  leavePlanet$ = createEffect(() => this.actions$.pipe(
    ofType(actions.leavePlanet),
    switchMap(() => this.planetsService
      .leavePlanet()
      .pipe(
        tap(() => this.notifierService.notify('success', 'Left the planet')),
        map(() => actions.loadMyExploration()),
        catchError(err => this.onError(err))))
  ));

  explorePlanet$ = createEffect(() => this.actions$.pipe(
    ofType(actions.explorePlanet),
    switchMap(({planetId}) => this.planetsService
      .explorePlanet(planetId)
      .pipe(
        tap(() => this.notifierService.notify('success', 'You are now exploring the planet')),
        map(() => actions.loadMyExploration()),
        catchError(err => this.onError(err))))
  ));

  loadTravelTime$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTravelTime),
    switchMap(() => this.planetsService
      .getTravelTime()
      .pipe(
        map((travelTime) => actions.loadTravelTimeSuccess({travelTime})),
        catchError(err => this.onError(err))))
  ));

  constructor(private actions$: Actions,
              private planetsService: PlanetsService,
              private notifierService: NotifierService,
              private dialog: MatDialog) {
  }

  /**
   * Handles the error case for any of the effects.
   * @param err Error.
   */
  onError(err: any): Observable<never> {
    const errorText = replaceErrorCodes(err);
    this.log.warn(errorText);
    this.notifierService.notify('error', errorText);
    return EMPTY;
  }
}
