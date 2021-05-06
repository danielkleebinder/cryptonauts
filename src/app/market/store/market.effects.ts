import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as actions from './market.actions';
import * as actionsFromInventory from '../../inventory/store/inventory.actions';
import {MarketService} from '../market.service';

import {Logger} from '../../core/utils';
import {replaceErrorCodes} from '../../core/error';


@Injectable()
export class MarketEffects {

  private readonly log = Logger.getLogger(MarketEffects);

  loadMarket$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadMarket),
    switchMap(() => this.marketService
      .getMarket()
      .pipe(
        map((items) => actions.loadMarketSuccess({items})),
        catchError(err => {
          const errorText = replaceErrorCodes(err);
          this.log.warn(errorText);
          this.notifierService.notify('error', errorText);
          return EMPTY;
        })
      ))
  ));

  addItemType$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addItemType),
    switchMap(({newItem}) => this.marketService
      .addItemType(newItem.name, newItem.mining, newItem.attack, newItem.defense, newItem.cost)
      .pipe(
        map(() => actions.addItemTypeSuccess()),
        catchError(err => {
          const errorText = replaceErrorCodes(err);
          this.log.warn(errorText);
          this.notifierService.notify('error', errorText);
          return EMPTY;
        })
      ))
  ));

  buyItem$ = createEffect(() => this.actions$.pipe(
    ofType(actions.buyItem),
    switchMap(({itemTypeId}) => this.marketService
      .buyItem(itemTypeId)
      .pipe(
        map(() => actionsFromInventory.loadTokens()),
        catchError(err => {
          const errorText = replaceErrorCodes(err);
          this.log.warn(errorText);
          this.notifierService.notify('error', errorText);
          return EMPTY;
        })
      ))
  ));

  constructor(private actions$: Actions,
              private marketService: MarketService,
              private notifierService: NotifierService) {
  }
}
