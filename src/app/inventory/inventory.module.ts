import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import * as queries from './store/inventory.selectors';
import {InventoryEffects, InventoryFacade, reducer} from './store';
import {InventoryComponent} from './inventory.component';
import {ItemComponent} from './item/item.component';
import {BuyTokensComponent} from './buy-tokens/buy-tokens.component';

import {SharedModule} from '../shared/shared.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    InventoryComponent,
    ItemComponent,
    BuyTokensComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(queries.featureKey, reducer),
    EffectsModule.forFeature([InventoryEffects]),
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    InventoryFacade
  ]
})
export class InventoryModule {
}
