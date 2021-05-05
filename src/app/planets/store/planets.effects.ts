import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

import * as actions from './planets.actions';

import {PlanetsService} from '../planets.service';
import {NotifierService} from 'angular-notifier';
import {Logger} from '../../core/utils';


@Injectable()
export class PlanetsEffects {

  private readonly log = Logger.getLogger(PlanetsEffects);

  planetExplorerArrived$ = createEffect(() => this.planetsService.explorerArrivedEvent$.pipe(map(() => actions.loadPlanets())));
  planetExplorerLeft$ = createEffect(() => this.planetsService.explorerLeftEvent$.pipe(map(() => actions.loadPlanets())));

  planetResourcesCollected$ = createEffect(() => this.planetsService.resourcesCollectedEvent$.pipe(
    tap((collectedResources) => this.notifierService.notify('success', `You found ${collectedResources} space diamonds during your exploration`)),
  ), {dispatch: false});

  loadPlanets$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadPlanets),
    switchMap(() => this.planetsService
      .getPlanets()
      .pipe(
        map((planets) => actions.loadPlanetsSuccess({planets})),
        catchError(err => {
          this.log.warn(err);
          this.notifierService.notify('error', err);
          return EMPTY;
        })
      ))
  ));

  loadMyExploration$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadMyExploration),
    switchMap(() => this.planetsService
      .getMyExploration()
      .pipe(
        map((exploration) => actions.loadMyExplorationSuccess({exploration})),
        catchError(err => {
          this.log.warn(err);
          this.notifierService.notify('error', err);
          return EMPTY;
        })
      ))
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
        catchError(err => {
          this.log.warn(err);
          this.notifierService.notify('error', err);
          return EMPTY;
        })
      ))
  ));

  leavePlanet$ = createEffect(() => this.actions$.pipe(
    ofType(actions.leavePlanet),
    switchMap(() => this.planetsService
      .leavePlanet()
      .pipe(
        tap(() => this.notifierService.notify('success', 'Left the planet')),
        map(() => actions.loadMyExploration()),
        catchError(err => {
          this.log.warn(err);
          this.notifierService.notify('error', err);
          return EMPTY;
        })
      ))
  ));

  explorePlanet$ = createEffect(() => this.actions$.pipe(
    ofType(actions.explorePlanet),
    switchMap(({planetId}) => this.planetsService
      .explorePlanet(planetId)
      .pipe(
        tap(() => this.notifierService.notify('success', 'You are now exploring the planet')),
        map(() => actions.loadMyExploration()),
        catchError(err => {
          this.log.warn(err);
          this.notifierService.notify('error', err);
          return EMPTY;
        })
      ))
  ));

  constructor(private actions$: Actions,
              private planetsService: PlanetsService,
              private notifierService: NotifierService) {
  }
}
