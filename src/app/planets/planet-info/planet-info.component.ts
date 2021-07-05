import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Planet, planetDescriptions} from '../models';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogModel,
  ConfirmationDialogResult
} from '../../shared/components/confirmation-dialog';
import {computePlanetSurfaceGravity, computeRelativePlanetMass, computeRelativePlanetSize} from '../../core/utils';
import {filter, map} from 'rxjs/operators';
import {PlanetsFacade} from '../store';


@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetInfoComponent {

  @Output() close = new EventEmitter<Planet>();
  @Input() planet: Planet;

  exploring$ = this.planetsFacade.myExploration$
    .pipe(
      filter(exploration => exploration != null),
      map(exploration => exploration.exploring && exploration.planetId === this.planet.id));

  constructor(private dialog: MatDialog,
              private planetsFacade: PlanetsFacade) {
  }

  get relativePlanetSize(): number {
    return computeRelativePlanetSize(this.planet);
  }

  get relativePlanetMass(): number {
    return computeRelativePlanetMass(this.planet);
  }

  get surfaceGravity(): number {
    return computePlanetSurfaceGravity(this.planet);
  }

  get description(): string {
    return planetDescriptions[this.planet?.name?.toLowerCase()];
  }

  collectMinedResources(): void {
    this.planetsFacade.collectMinedResources();
  }

  leavePlanet(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Leave ' + this.planet.name,
        message: `Are you sure that you want to leave ${this.planet.name} now?`,
        confirmationText: 'Leave'
      } as ConfirmationDialogModel
    }).afterClosed()
      .pipe(filter(res => res === ConfirmationDialogResult.Confirm))
      .subscribe(() => this.planetsFacade.leavePlanet());
  }

  explore(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Explore ' + this.planet.name,
        message: `Are you sure that you want to explore ${this.planet.name}?`,
        confirmationText: 'Explore'
      } as ConfirmationDialogModel
    }).afterClosed()
      .pipe(filter(res => res === ConfirmationDialogResult.Confirm))
      .subscribe(() => this.planetsFacade.explorePlanet(this.planet.id));
  }
}
