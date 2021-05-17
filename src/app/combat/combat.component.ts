import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Astronaut} from '../astronaut/models';
import {AstronautFacade} from '../astronaut/store';
import {AstronautFilters} from './astronaut-filters/astronaut-filters';
import {matchesFilter} from './astronaut-filters/astronaut-filters-fn';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CombatComponent implements OnInit {

  filter$ = new BehaviorSubject<AstronautFilters>(null);

  astronauts$ = combineLatest([
    this.astronautFacade.astronauts$,
    this.filter$
  ]).pipe(
    map(([astronauts, filter]) => astronauts
      .map((curr, index) => ({...curr, ranking: (index + 1)}))
      .filter(curr => matchesFilter(curr, filter))),
    map((astronauts) => astronauts));

  constructor(private astronautFacade: AstronautFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.refresh();
  }

  /**
   * Refreshes the list of astronauts.
   */
  refresh(): void {
    this.astronautFacade.loadAstronauts();
  }

  /**
   * Readjust whats shown on the screen.
   * @param filter Filter.
   */
  filterChanged(filter: AstronautFilters): void {
    this.filter$.next(filter);
  }

  /**
   * Fight against the opponent given.
   * @param opponent Your opponent.
   */
  fight(opponent: Astronaut): void {
    this.astronautFacade.fight(opponent);
  }
}
