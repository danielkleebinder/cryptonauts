import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Astronaut} from '../../astronaut/models';

@Component({
  selector: 'app-astronaut-item',
  templateUrl: './astronaut-item.component.html',
  styleUrls: ['./astronaut-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautItemComponent {

  @Input() ranking: number;
  @Input() astronaut: Astronaut;
  @Output() fight = new EventEmitter<Astronaut>();

}
