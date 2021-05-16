import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AstronautFacade} from '../store';
import {AstronautSpecialization} from '../models';

@Component({
  selector: 'app-astronaut-level-up',
  templateUrl: './astronaut-level-up.component.html',
  styleUrls: ['./astronaut-level-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautLevelUpComponent {

  selected: AstronautSpecialization;
  types = AstronautSpecialization;

  levelUpCost$ = this.astronautFacade.levelUpCost$;


  constructor(private astronautFacade: AstronautFacade) {
  }

  select(specialization: AstronautSpecialization): void {
    this.selected = specialization;
  }

  levelUp(): void {
    this.astronautFacade.levelUp(this.selected);
  }
}
