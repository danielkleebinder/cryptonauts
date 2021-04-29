import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Planet} from '../models';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetComponent {
  @Input() planet: Planet;
}
