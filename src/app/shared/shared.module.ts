import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';

import {BackgroundComponent} from './components/background/background.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog';
import {MatButtonModule} from '@angular/material/button';
import {TokensComponent} from './components/tokens/tokens.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    BackgroundComponent,
    ConfirmationDialogComponent,
    TokensComponent
  ],
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    BackgroundComponent,
    ConfirmationDialogComponent,
    TokensComponent
  ]
})
export class SharedModule {
}
