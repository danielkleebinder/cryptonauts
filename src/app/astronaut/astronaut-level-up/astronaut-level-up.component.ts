import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AstronautFacade} from '../store';
import {AstronautSpecialization} from '../models';
import {InventoryFacade} from '../../inventory/store';

@Component({
  selector: 'app-astronaut-level-up',
  templateUrl: './astronaut-level-up.component.html',
  styleUrls: ['./astronaut-level-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautLevelUpComponent implements OnInit {

  selected: AstronautSpecialization;
  types = AstronautSpecialization;

  levelUpCost$ = this.astronautFacade.levelUpCost$;
  tokens$ = this.inventoryFacade.tokens$;

  constructor(private astronautFacade: AstronautFacade,
              private inventoryFacade: InventoryFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.inventoryFacade.loadTokens();
  }

  select(specialization: AstronautSpecialization): void {
    this.selected = specialization;
  }

  levelUp(): void {
    this.astronautFacade.levelUp(this.selected);
  }
}
