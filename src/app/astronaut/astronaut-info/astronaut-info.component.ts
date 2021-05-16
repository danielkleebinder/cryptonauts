import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AstronautFacade} from '../store';
import {AstronautLevelUpComponent} from '../astronaut-level-up/astronaut-level-up.component';


@Component({
  selector: 'app-astronaut-info',
  templateUrl: './astronaut-info.component.html',
  styleUrls: ['./astronaut-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautInfoComponent implements OnInit {

  me$ = this.astronautFacade.me$;

  constructor(private astronautFacade: AstronautFacade,
              private dialog: MatDialog) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.astronautFacade.loadLevelUpCost();
  }

  /**
   * Level up my astronaut.
   */
  levelUp(): void {
    this.dialog.open(AstronautLevelUpComponent, {width: '600px'});
  }
}
