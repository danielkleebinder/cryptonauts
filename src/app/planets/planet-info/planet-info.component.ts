import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Planet} from '../models';
import {ConfirmationDialogComponent, ConfirmationDialogModel} from '../../shared/components/confirmation-dialog';

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

  explore(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {} as ConfirmationDialogModel
    });
  }
}
