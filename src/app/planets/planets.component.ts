import {ChangeDetectionStrategy, Component} from '@angular/core';
import {planets} from './planets';
import {Planet} from './models';
import {slideOut} from './planets.animation';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  animations: [slideOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsComponent {

  cryptoverse = planets;
  selectedPlanet: Planet;

  selectPlanet(planet: Planet): void {
    if (this.selectedPlanet?.id === planet.id) {
      this.selectedPlanet = null;
    } else {
      this.selectedPlanet = planet;
    }
  }
}
