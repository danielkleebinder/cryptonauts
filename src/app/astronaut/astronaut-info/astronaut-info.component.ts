import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Astronaut} from '../models';

@Component({
  selector: 'app-astronaut-info',
  templateUrl: './astronaut-info.component.html',
  styleUrls: ['./astronaut-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautInfoComponent {
  @Input() me: Astronaut;
}
