import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as actions from './admin.actions';

import {Logger} from '../../core/utils';
import {replaceErrorCodes} from '../../core/error';
import {AdminService} from '../admin.service';


@Injectable()
export class AdminEffects {

  private readonly log = Logger.getLogger(AdminEffects);

  addOwner$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addOwner),
    switchMap(({address}) => this.adminService
      .addOwner(address)
      .pipe(
        tap(() => this.notifierService.notify('warning', `You added ${address} as an owner`)),
        catchError(err => this.onError(err))))
  ), {dispatch: false});

  renounceOwner$ = createEffect(() => this.actions$.pipe(
    ofType(actions.renounceOwner),
    switchMap(() => this.adminService
      .renounceOwner()
      .pipe(
        tap(() => this.notifierService.notify('warning', 'You are no longer an owner of the game')),
        catchError(err => this.onError(err))))
  ), {dispatch: false});

  redeemEther$ = createEffect(() => this.actions$.pipe(
    ofType(actions.redeemEther),
    switchMap(() => this.adminService
      .redeemEther()
      .pipe(
        tap(() => this.notifierService.notify('warning', 'The game contracts Ether was transferred to your account')),
        catchError(err => this.onError(err))))
  ), {dispatch: false});

  setTokenPrice$ = createEffect(() => this.actions$.pipe(
    ofType(actions.setTokenPrice),
    switchMap(({tokenPrice}) => this.adminService
      .setTokenPrice(tokenPrice)
      .pipe(
        tap(() => this.notifierService.notify('success', `Token price updated to ${tokenPrice} Wei`)),
        catchError(err => this.onError(err))))
  ), {dispatch: false});

  setLevelUpFactor$ = createEffect(() => this.actions$.pipe(
    ofType(actions.setLevelUpFactor),
    switchMap(({levelUpFactor}) => this.adminService
      .setLevelUpFactor(levelUpFactor)
      .pipe(
        tap(() => this.notifierService.notify('success', `Level up factor updated to ${levelUpFactor}`)),
        catchError(err => this.onError(err))))
  ), {dispatch: false});

  setTravelTime$ = createEffect(() => this.actions$.pipe(
    ofType(actions.setTravelTime),
    switchMap(({travelTime}) => this.adminService
      .setTravelTime(travelTime)
      .pipe(
        tap(() => this.notifierService.notify('success', `The required travel time between planets is now ${travelTime} seconds`)),
        catchError(err => this.onError(err))))
  ), {dispatch: false});

  addItemType$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addItemType),
    switchMap(({newItem}) => this.adminService
      .addItemType(newItem.name, newItem.mining, newItem.attack, newItem.defense, newItem.cost)
      .pipe(
        map(() => actions.addItemTypeSuccess()),
        catchError(err => this.onError(err))))
  ));

  loadContractBalance$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadContractBalance),
    switchMap(() => this.adminService
      .getGameContractBalance()
      .pipe(
        map((contractBalance) => actions.loadContractBalanceSuccess({contractBalance})),
        catchError(err => this.onError(err))))
  ));

  loadOwnership$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadOwnership),
    switchMap(() => this.adminService
      .isOwner()
      .pipe(
        map((owner) => actions.loadOwnershipSuccess({owner})),
        catchError(err => this.onError(err))))
  ));

  constructor(private actions$: Actions,
              private adminService: AdminService,
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
