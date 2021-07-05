import {ChangeDetectionStrategy, Component, OnInit, TrackByFunction} from '@angular/core';
import {Planet} from './models';
import {slideOutNotes, slideOutTravelTimer} from './planets.animation';
import {PlanetsFacade} from './store';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  animations: [slideOutNotes, slideOutTravelTimer],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsComponent implements OnInit {

  cryptoverse$ = this.planetsFacade.planets$;
  activePlanet$ = this.planetsFacade.activePlanet$;
  hasActivePlanet$ = this.planetsFacade.hasActivePlanet$;
  exploration$ = this.planetsFacade.myExploration$;

  // Improve performance by using a tracking function
  trackByPlanetId: TrackByFunction<Planet> = (index, planet) => planet.id;

  constructor(private planetsFacade: PlanetsFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.planetsFacade.loadPlanets();
    this.planetsFacade.loadTravelTime();
    this.planetsFacade.loadMyExploration();
  }

  selectPlanet(planet: Planet): void {
    this.planetsFacade.selectPlanet(planet.id);
  }

  unselectPlanet(): void {
    this.planetsFacade.selectPlanet(null);
  }
}
