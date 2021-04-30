import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Planet, planetDescriptions} from '../models';
import {ConfirmationDialogComponent, ConfirmationDialogModel} from '../../shared/components/confirmation-dialog';
import {computePlanetSurfaceGravity, computeRelativePlanetMass, computeRelativePlanetSize} from '../../core/utils';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetInfoComponent {

  @Output() close = new EventEmitter<Planet>();
  @Input() planet: Planet;

  constructor(private dialog: MatDialog) {
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

  explore(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {} as ConfirmationDialogModel
    });
  }
}
