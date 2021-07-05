import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

import {BackgroundComponent} from './components/background/background.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog';
import {TokensComponent} from './components/tokens/tokens.component';
import {DescribedTextComponent} from './components/described-text/described-text.component';
import {InfoCardComponent} from './components/info-card/info-card.component';

import {SpaceDiamondsPipe} from './pipes/space-diamonds.pipe';


@NgModule({
  declarations: [
    BackgroundComponent,
    ConfirmationDialogComponent,
    TokensComponent,
    DescribedTextComponent,
    InfoCardComponent,
    SpaceDiamondsPipe
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
    TokensComponent,
    DescribedTextComponent,
    InfoCardComponent,
    SpaceDiamondsPipe
  ]
})
export class SharedModule {
}
