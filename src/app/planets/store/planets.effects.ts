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

  loadPlanets$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadPlanets),
    switchMap(() => this.planetsService
      .getPlanets()
      .pipe(
        tap(() => this.notifierService.notify('success', 'Planets loaded successfully')),
        map((planets) => actions.loadPlanetsSuccess({planets})),
        catchError(err => {
          this.log.warn(err);
          this.notifierService.notify('error', err);
          return EMPTY;
        })
      ))
  ));

  loadExplorerCount$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadExplorerCount),
    switchMap(({planetId}) => this.planetsService
      .getExplorerCount(planetId)
      .pipe(
        tap(() => this.notifierService.notify('success', 'Planet explorer loaded')),
        map((explorerCount) => actions.loadExplorerCountSuccess({planetId, explorerCount})),
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
        tap(() => this.notifierService.notify('success', 'Exploration status loaded')),
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
    switchMap(({planetId}) => [
      actions.loadExplorerCount({planetId}),
      actions.loadMyExploration()
    ])
  ));

  leavePlanet$ = createEffect(() => this.actions$.pipe(
    ofType(actions.leavePlanet),
    switchMap(() => this.planetsService
      .leavePlanet()
      .pipe(
        tap(() => this.notifierService.notify('success', 'Left the planet')),
        catchError(err => {
          this.log.warn(err);
          this.notifierService.notify('error', err);
          return EMPTY;
        })
      ))
  ), {dispatch: false});

  explorePlanet$ = createEffect(() => this.actions$.pipe(
    ofType(actions.explorePlanet),
    switchMap(({planetId}) => this.planetsService
      .explorePlanet(planetId)
      .pipe(
        tap(() => this.notifierService.notify('success', 'You are now exploring the planet')),
        switchMap(() => [
          actions.loadExplorerCount({planetId}),
          actions.loadMyExploration()]),
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
