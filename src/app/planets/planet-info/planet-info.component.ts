import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {Planet} from '../models';
import {fadeIn} from './planet-info.animation';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.css'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetInfoComponent {
  @Output() close = new EventEmitter<Planet>();
  @Input() planet: Planet;
  @HostBinding('@fadeIn') fadeInAnimation = true;
}
