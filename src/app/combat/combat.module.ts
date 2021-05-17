import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import {CombatComponent} from './combat.component';

import {AstronautModule} from '../astronaut/astronaut.module';
import {MatSortModule} from "@angular/material/sort";


@NgModule({
  declarations: [
    CombatComponent
  ],
  imports: [
    CommonModule,
    AstronautModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class CombatModule {
}
