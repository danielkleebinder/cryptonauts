import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import * as actions from './market.actions';
import * as actionsFromInventory from '../../inventory/store/inventory.actions';
import {MarketService} from '../market.service';

import {NotifierService} from 'angular-notifier';
import {Logger} from '../../core/utils';


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
          this.log.warn(err);
          this.notifierService.notify('error', err);
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
          this.log.warn(err);
          this.notifierService.notify('error', err);
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
          this.log.warn(err);
          this.notifierService.notify('error', err);
          return EMPTY;
        })
      ))
  ));

  constructor(private actions$: Actions,
              private marketService: MarketService,
              private notifierService: NotifierService) {
  }
}
