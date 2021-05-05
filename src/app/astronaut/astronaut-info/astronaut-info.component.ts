import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent, ConfirmationDialogModel} from '../../shared/components/confirmation-dialog';
import {Astronaut} from '../models';

@Component({
  selector: 'app-astronaut-info',
  templateUrl: './astronaut-info.component.html',
  styleUrls: ['./astronaut-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautInfoComponent {

  @Input() me: Astronaut;

  constructor(private dialog: MatDialog) {
  }

  increaseLevel(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Increase Level',
        message: 'Are you sure that you want to increase your level? This will cost you 7 Things.',
        cancelText: 'Not now',
        confirmationText: 'Make me stronger'
      } as ConfirmationDialogModel
    });
  }
}
