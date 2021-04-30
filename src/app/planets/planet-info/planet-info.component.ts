import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Planet} from '../models';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetInfoComponent {
  @Output() close = new EventEmitter<Planet>();
  @Input() planet: Planet;
}
