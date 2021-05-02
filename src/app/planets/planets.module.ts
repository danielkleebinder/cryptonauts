import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {PlanetsComponent} from './planets.component';
import {PlanetComponent} from './planet/planet.component';
import {PlanetInfoComponent} from './planet-info/planet-info.component';
import {PlanetsEffects, PlanetsFacade, reducer} from './store';
import * as queries from './store/planets.selectors';


const routes: Routes = [
  {path: '', component: PlanetsComponent}
];


@NgModule({
  declarations: [
    PlanetsComponent,
    PlanetComponent,
    PlanetInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(queries.featureKey, reducer),
    EffectsModule.forFeature([PlanetsEffects]),

    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatSidenavModule
  ],
  providers: [
    PlanetsFacade
  ]
})
export class PlanetsModule {
}
