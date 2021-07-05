import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, Observable, timer} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {PlanetsFacade} from '../store';

@Component({
  selector: 'app-planet-travel-timer',
  templateUrl: './planet-travel-timer.component.html',
  styleUrls: ['./planet-travel-timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetTravelTimerComponent implements OnInit {

  timer$: Observable<number> = combineLatest([
    this.planetsFacade.myExploration$,
    this.planetsFacade.travelTime$
  ]).pipe(
    filter(([exploration, travelTime]) => exploration != null && !exploration.exploring && travelTime > 0),
    switchMap(([exploration, travelTime]) => timer(0, 10)
      .pipe(
        map(() => (+exploration.startTime) * 1000),
        map(startTime => (Date.now() - startTime) / (travelTime * 1000) * 100))));

  constructor(private planetsFacade: PlanetsFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.planetsFacade.loadTravelTime();
  }
}
