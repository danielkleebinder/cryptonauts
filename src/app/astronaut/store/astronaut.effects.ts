import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as actions from './astronaut.actions';
import {AstronautService} from '../astronaut.service';

import {Logger} from '../../core/utils';
import {replaceErrorCodes} from '../../core/error';


@Injectable()
export class AstronautEffects {

  private readonly log = Logger.getLogger(AstronautEffects);

  levelUpEvent$ = createEffect(() => this.astronautService.levelUpEvent$
    .pipe(switchMap(() => [
      actions.loadMyAstronaut(),
      actions.loadLevelUpCost(),
      actions.loadAstronauts()
    ])));

  loadAstronauts$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadAstronauts),
    switchMap(() => this.astronautService
      .getAstronauts()
      .pipe(
        map((astronauts) => actions.loadAstronautsSuccess({astronauts})),
        catchError(err => this.onError(err))))
  ));

  levelUp$ = createEffect(() => this.actions$.pipe(
    ofType(actions.levelUp),
    switchMap(({specialization}) => this.astronautService
      .levelUp(specialization)
      .pipe(
        map(() => actions.levelUpSuccess()),
        catchError(err => this.onError(err))))
  ));

  fight$ = createEffect(() => this.actions$.pipe(
    ofType(actions.fight),
    switchMap(({opponent}) => this.astronautService
      .fight(opponent)
      .pipe(
        switchMap(() => [
          actions.loadMyAstronaut(),
          actions.loadAstronauts()
        ]),
        catchError(err => this.onError(err))))
  ));

  loadLevelUpCost$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadLevelUpCost),
    switchMap(() => this.astronautService
      .getLevelUpCost()
      .pipe(
        map((levelUpCost) => actions.loadLevelUpCostSuccess({levelUpCost})),
        catchError(err => this.onError(err))))
  ));

  loadMyAstronaut$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadMyAstronaut),
    switchMap(() => this.astronautService
      .getMyAstronaut()
      .pipe(
        map((me) => actions.loadMyAstronautSuccess({me})),
        catchError(err => this.onError(err))))
  ));

  constructor(private actions$: Actions,
              private astronautService: AstronautService,
              private notifierService: NotifierService) {
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
