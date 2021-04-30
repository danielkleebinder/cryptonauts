import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {routeAnimation} from './app.animation';
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogComponent,
  ConfirmationDialogModel,
  ConfirmationDialogResult
} from "./shared/components/confirmation-dialog";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private dialog: MatDialog,
              private router: Router) {
  }

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.isActivated && outlet.activatedRoute;
  }

  exit(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Exit',
        message: 'Are you sure you want to exit the app? You have to enter the games and your address again. Your state is saved!',
        confirmationText: 'Exit'
      } as ConfirmationDialogModel
    }).afterClosed()
      .pipe(filter(res => res === ConfirmationDialogResult.Confirm))
      .subscribe(() => this.router.navigate(['/auth']));
  }
}
