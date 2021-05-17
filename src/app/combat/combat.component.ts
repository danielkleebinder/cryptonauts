import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Astronaut} from '../astronaut/models';
import {AstronautFacade} from '../astronaut/store';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CombatComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'level', 'winCount', 'actions'];
  dataSource = new MatTableDataSource<Astronaut>();

  private astronautsSubscription: Subscription;

  constructor(private astronautFacade: AstronautFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.astronautsSubscription = this.astronautFacade
      .astronauts$
      .subscribe(astronauts => this.dataSource = new MatTableDataSource<Astronaut>(astronauts));

    this.astronautFacade.loadAstronauts();
  }

  /** @inheritDoc */
  ngOnDestroy(): void {
    this.astronautsSubscription?.unsubscribe();
  }

  fight(astronaut: Astronaut):void{
  }
}
