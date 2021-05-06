import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {filter} from 'rxjs/operators';
import {routeAnimation} from './app.animation';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogModel,
  ConfirmationDialogResult
} from './shared/components/confirmation-dialog';
import {InventoryComponent} from './inventory/inventory.component';
import {BlockchainService} from './core/services/blockchain.service';
import {AdminComponent} from './admin/admin.component';
import {MarketComponent} from './market/market.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  contractActive$ = this.blockchain.contractActive$;

  constructor(private dialog: MatDialog,
              private router: Router,
              private blockchain: BlockchainService) {
  }

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.isActivated && outlet.activatedRoute;
  }

  showInventory(): void {
    this.dialog.open(InventoryComponent, {width: '900px'});
  }

  showMarket(): void {
    this.dialog.open(MarketComponent, {width: '800px'});
  }

  showAdminSettings(): void {
    this.dialog.open(AdminComponent, {width: '800px'});
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
      .subscribe(() => {
        this.blockchain.logout();
        this.router.navigate(['/auth']);
      });
  }
}
