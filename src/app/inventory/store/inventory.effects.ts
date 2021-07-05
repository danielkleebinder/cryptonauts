import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import * as actions from './inventory.actions';
import * as actionsFromAstronaut from '../../astronaut/store/astronaut.actions';
import {InventoryService} from '../inventory.service';

import {Logger} from '../../core/utils';
import {replaceErrorCodes} from '../../core/error';


@Injectable()
export class InventoryEffects {

  private readonly log = Logger.getLogger(InventoryEffects);

  loadInventory$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadInventory),
    switchMap(() => this.inventoryService
      .getInventory()
      .pipe(
        map((items) => actions.loadInventorySuccess({items})),
        catchError(err => this.onError(err))))
  ));

  loadPlayerBalance$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadPlayerBalance),
    switchMap(() => this.inventoryService
      .getPlayerBalance()
      .pipe(
        map((playerBalance) => actions.loadPlayerBalanceSuccess({playerBalance})),
        catchError(err => this.onError(err))))
  ));

  buyTokens$ = createEffect(() => this.actions$.pipe(
    ofType(actions.buyTokens),
    switchMap(({wei}) => this.inventoryService
      .buyTokens(wei)
      .pipe(
        tap(() => this.notifierService.notify('success', `You successfully bought tokens with a value of ${wei} Wei`)),
        map(() => actions.loadTokens()),
        catchError(err => this.onError(err))))
  ));

  loadTokenPrice$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTokenPrice),
    switchMap(() => this.inventoryService
      .getTokenPrice()
      .pipe(
        map((tokenPrice) => actions.loadTokenPriceSuccess({tokenPrice})),
        catchError(err => this.onError(err))))
  ));

  loadTokens$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTokens),
    switchMap(() => this.inventoryService
      .getBalance()
      .pipe(
        map((tokens) => actions.loadTokensSuccess({tokens})),
        catchError(err => this.onError(err))))
  ));

  upgradeItem$ = createEffect(() => this.actions$.pipe(
    ofType(actions.upgradeItem),
    switchMap(({itemId}) => this.inventoryService
      .upgradeItem(itemId)
      .pipe(
        switchMap(() => [
          actions.upgradeItemSuccess({itemId}),
          actions.loadInventory(),
          actions.loadTokens()
        ]),
        catchError(err => this.onError(err))))
  ));

  destroyItem$ = createEffect(() => this.actions$.pipe(
    ofType(actions.destroyItem),
    switchMap(({itemId}) => this.inventoryService
      .destroyItem(itemId)
      .pipe(
        map(() => actions.destroyItemSuccess({itemId})),
        catchError(err => this.onError(err))))
  ));

  equipItem$ = createEffect(() => this.actions$.pipe(
    ofType(actions.equipItem),
    switchMap(({itemId}) => this.inventoryService
      .equip(itemId)
      .pipe(
        tap(() => this.notifierService.notify('success', 'Item equipped')),
        switchMap(() => [
          actions.equipItemSuccess(),
          actions.loadInventory(),
          actionsFromAstronaut.loadMyAstronaut()
        ]),
        catchError(err => this.onError(err))))
  ));

  unequipItem$ = createEffect(() => this.actions$.pipe(
    ofType(actions.unequipItem),
    switchMap(({itemId}) => this.inventoryService
      .unequip(itemId)
      .pipe(
        tap(() => this.notifierService.notify('success', 'Item unequipped')),
        switchMap(() => [
          actions.unequipItemSuccess(),
          actions.loadInventory(),
          actionsFromAstronaut.loadMyAstronaut()
        ]),
        catchError(err => this.onError(err))))
  ));

  constructor(private actions$: Actions,
              private inventoryService: InventoryService,
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
