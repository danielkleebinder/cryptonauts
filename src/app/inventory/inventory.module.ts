import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryComponent} from './inventory.component';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import * as queries from './store/inventory.selectors';
import {InventoryEffects, InventoryFacade, reducer} from './store';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SharedModule} from "../shared/shared.module";
import {ItemComponent} from './item/item.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    InventoryComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(queries.featureKey, reducer),
    EffectsModule.forFeature([InventoryEffects]),
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    SharedModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    InventoryFacade
  ]
})
export class InventoryModule {
}
