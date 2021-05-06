import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as actions from './inventory.actions';
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
        catchError(err => {
          const errorText = replaceErrorCodes(err);
          this.log.warn(errorText);
          this.notifierService.notify('error', errorText);
          return EMPTY;
        })
      ))
  ));

  loadTokens = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTokens),
    switchMap(() => this.inventoryService
      .getBalance()
      .pipe(
        map((tokens) => actions.loadTokensSuccess({tokens})),
        catchError(err => {
          const errorText = replaceErrorCodes(err);
          this.log.warn(errorText);
          this.notifierService.notify('error', errorText);
          return EMPTY;
        })
      ))
  ));

  upgradeItem = createEffect(() => this.actions$.pipe(
    ofType(actions.upgradeItem),
    switchMap(({itemId}) => this.inventoryService
      .upgradeItem(itemId)
      .pipe(
        switchMap(() => [
          actions.upgradeItemSuccess({itemId}),
          actions.loadInventory(),
          actions.loadTokens()
        ]),
        catchError(err => {
          const errorText = replaceErrorCodes(err);
          this.log.warn(errorText);
          this.notifierService.notify('error', errorText);
          return EMPTY;
        })
      ))
  ));

  destroyItem = createEffect(() => this.actions$.pipe(
    ofType(actions.destroyItem),
    switchMap(({itemId}) => this.inventoryService
      .destroyItem(itemId)
      .pipe(
        map(() => actions.destroyItemSuccess({itemId})),
        catchError(err => {
          const errorText = replaceErrorCodes(err);
          this.log.warn(errorText);
          this.notifierService.notify('error', errorText);
          return EMPTY;
        })
      ))
  ));

  constructor(private actions$: Actions,
              private inventoryService: InventoryService,
              private notifierService: NotifierService) {
  }
}
