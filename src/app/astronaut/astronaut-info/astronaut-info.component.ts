import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {filter, take} from 'rxjs/operators';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogModel,
  ConfirmationDialogResult
} from '../../shared/components/confirmation-dialog';
import {AstronautFacade} from '../store';


@Component({
  selector: 'app-astronaut-info',
  templateUrl: './astronaut-info.component.html',
  styleUrls: ['./astronaut-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautInfoComponent implements OnInit {

  me$ = this.astronautFacade.me$;
  levelUpCost$ = this.astronautFacade.levelUpCost$;

  constructor(private astronautFacade: AstronautFacade,
              private dialog: MatDialog) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.astronautFacade.loadLevelUpCost();
  }

  /**
   * Level up my astronaut.
   */
  levelUp(): void {
    this.levelUpCost$
      .pipe(take(1))
      .subscribe((levelUpCost) => {
        this.dialog.open(ConfirmationDialogComponent, {
          width: '400px',
          data: {
            title: 'Level Up',
            message: `Are you sure that you want to increase your level? This will cost you ${levelUpCost} space diamonds.`,
            cancelText: 'Not now',
            confirmationText: 'Make me stronger'
          } as ConfirmationDialogModel
        }).afterClosed()
          .pipe(filter(res => res === ConfirmationDialogResult.Confirm))
          .subscribe(() => this.astronautFacade.levelUp());
      });
  }
}
