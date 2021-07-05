import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {SharedModule} from '../shared/shared.module';
import * as queries from './store/astronaut.selectors';
import {AstronautEffects, AstronautFacade, reducer} from './store';
import {AstronautComponent} from './astronaut.component';
import {AstronautInfoComponent} from './astronaut-info/astronaut-info.component';
import { AstronautLevelUpComponent } from './astronaut-level-up/astronaut-level-up.component';
import {MatDialogModule} from "@angular/material/dialog";
import { NewAstronautComponent } from './new-astronaut/new-astronaut.component';


const routes: Routes = [
  {path: '', component: AstronautComponent}
];


@NgModule({
  declarations: [
    AstronautComponent,
    AstronautInfoComponent,
    AstronautLevelUpComponent,
    NewAstronautComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(queries.featureKey, reducer),
    EffectsModule.forFeature([AstronautEffects]),
    SharedModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [
    AstronautFacade
  ]
})
export class AstronautModule {
}
