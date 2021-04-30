import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AstronautComponent} from './astronaut.component';
import {RouterModule, Routes} from '@angular/router';
import {MatSidenavModule} from "@angular/material/sidenav";
import { AstronautInfoComponent } from './astronaut-info/astronaut-info.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDividerModule} from "@angular/material/divider";
import {MatChipsModule} from "@angular/material/chips";


const routes: Routes = [
  {path: '', component: AstronautComponent}
];


@NgModule({
  declarations: [
    AstronautComponent,
    AstronautInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatChipsModule
  ]
})
export class AstronautModule {
}
