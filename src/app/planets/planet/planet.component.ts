import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Planet} from '../models';
import {computeRelativePlanetSize} from '../../core/utils';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetComponent {

  @Input() planet: Planet;

  get relativePlanetSize(): number {
    return computeRelativePlanetSize(this.planet);
  }
}
