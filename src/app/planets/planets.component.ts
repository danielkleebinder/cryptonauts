import {ChangeDetectionStrategy, Component} from '@angular/core';
import {planets} from './planets';
import {Planet} from './models';
import {Router} from '@angular/router';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsComponent {

  cryptoverse = planets;
  selectedPlanet: Planet;

  constructor(private router: Router) {
  }

  selectPlanet(planet: Planet): void {
    if (this.selectedPlanet?.id === planet.id) {
      this.selectedPlanet = null;
    } else {
      this.selectedPlanet = planet;
    }
  }
}
