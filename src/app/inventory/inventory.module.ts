import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryComponent} from './inventory.component';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import * as queries from './store/inventory.selectors';
import {InventoryEffects, InventoryFacade, reducer} from './store';


@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(queries.featureKey, reducer),
    EffectsModule.forFeature([InventoryEffects]),
  ],
  providers: [
    InventoryFacade
  ]
})
export class InventoryModule {
}
