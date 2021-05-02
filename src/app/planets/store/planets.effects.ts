import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

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

  constructor(private actions$: Actions,
              private planetsService: PlanetsService,
              private notifierService: NotifierService) {
  }
}
