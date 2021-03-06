import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {AdminComponent} from './admin.component';
import {AddItemComponent} from './add-item/add-item.component';
import {AddOwnerComponent} from './add-owner/add-owner.component';

import * as queries from './store/admin.selectors';
import {AdminEffects, AdminFacade, reducer} from './store';
import { ChangeTokenPriceComponent } from './change-token-price/change-token-price.component';
import { ChangeMaxItemLevelComponent } from './change-max-item-level/change-max-item-level.component';
import { ChangeMaxEquipmentCountComponent } from './change-max-equipment-count/change-max-equipment-count.component';
import { ChangeTravelTimeComponent } from './change-travel-time/change-travel-time.component';


@NgModule({
  declarations: [
    AdminComponent,
    AddItemComponent,
    AddOwnerComponent,
    ChangeTokenPriceComponent,
    ChangeMaxItemLevelComponent,
    ChangeMaxEquipmentCountComponent,
    ChangeTravelTimeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(queries.featureKey, reducer),
    EffectsModule.forFeature([AdminEffects]),
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    AdminFacade
  ]
})
export class AdminModule {
}
