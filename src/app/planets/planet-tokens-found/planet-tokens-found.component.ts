import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-planet-tokens-found',
  templateUrl: './planet-tokens-found.component.html',
  styleUrls: ['./planet-tokens-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetTokensFoundComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public tokens: number) {
  }

}
