import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {metaReducers} from './app.reducer';

import {SharedModule} from './shared/shared.module';
import {CombatModule} from './combat/combat.module';
import {InventoryModule} from './inventory/inventory.module';
import {MarketModule} from './market/market.module';
import {NotifierModule} from "angular-notifier";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {metaReducers}),
    EffectsModule.forRoot(),

    SharedModule,
    CombatModule,
    InventoryModule,
    MarketModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,

    NotifierModule.withConfig({
      position: {
        vertical: {position: 'bottom'},
        horizontal: {position: 'right'}
      }
    })
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
