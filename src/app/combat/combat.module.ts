import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import {CombatComponent} from './combat.component';

import {AstronautModule} from '../astronaut/astronaut.module';
import {MatSortModule} from "@angular/material/sort";
import { AstronautItemComponent } from './astronaut-item/astronaut-item.component';
import { AstronautFiltersComponent } from './astronaut-filters/astronaut-filters.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    CombatComponent,
    AstronautItemComponent,
    AstronautFiltersComponent
  ],
  imports: [
    CommonModule,
    AstronautModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatIconModule
  ]
})
export class CombatModule {
}
