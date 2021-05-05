import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import * as queries from './store/market.selectors';
import {MarketEffects, MarketFacade, reducer} from './store';
import {MarketComponent} from './market.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    MarketComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(queries.featureKey, reducer),
    EffectsModule.forFeature([MarketEffects]),
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    SharedModule
  ],
  providers: [
    MarketFacade
  ]
})
export class MarketModule {
}
