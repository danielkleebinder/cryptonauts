import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as actions from './inventory.actions';

import {NotifierService} from 'angular-notifier';
import {Logger} from '../../core/utils';
import {InventoryService} from '../inventory.service';


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
          this.log.warn(err);
          this.notifierService.notify('error', err);
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
          this.log.warn(err);
          this.notifierService.notify('error', err);
          return EMPTY;
        })
      ))
  ));

  constructor(private actions$: Actions,
              private inventoryService: InventoryService,
              private notifierService: NotifierService) {
  }
}
