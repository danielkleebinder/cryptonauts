import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';

import {BackgroundComponent} from './components/background/background.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    BackgroundComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    BackgroundComponent
  ]
})
export class SharedModule {
}
