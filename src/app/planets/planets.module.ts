import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanetsComponent} from './planets.component';
import {PlanetComponent} from './planet/planet.component';
import {RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PlanetInfoComponent } from './planet-info/planet-info.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatDividerModule} from "@angular/material/divider";


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

    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ]
})
export class PlanetsModule {
}
