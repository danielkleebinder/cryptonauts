import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {planets} from './planets';
import {Planet} from './models';
import {slideOut} from './planets.animation';
import {PlanetsFacade} from './store';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  animations: [slideOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsComponent implements OnInit {

  cryptoverse$ = this.planetsFacade.planets$;
  selectedPlanet: Planet;

  constructor(private planetsFacade: PlanetsFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.planetsFacade.loadPlanets();
  }

  selectPlanet(planet: Planet): void {
    if (this.selectedPlanet?.id === planet.id) {
      this.selectedPlanet = null;
    } else {
      this.selectedPlanet = planet;
    }
  }
}
