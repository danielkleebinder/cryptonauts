import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
import {CombatComponent} from './combat/combat.component';
import {AdminFacade} from './admin/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  contractActive$ = this.blockchain.contractActive$;
  isOwner$ = this.adminFacade.isOwner$;

  constructor(private dialog: MatDialog,
              private router: Router,
              private blockchain: BlockchainService,
              private adminFacade: AdminFacade) {
  }

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.isActivated && outlet.activatedRoute;
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.adminFacade.loadOwnership();
  }

  showCombat(): void {
    this.dialog.open(CombatComponent, {width: '900px'});
  }

  showInventory(): void {
    this.dialog.open(InventoryComponent, {width: '900px'});
  }

  showMarket(): void {
    this.dialog.open(MarketComponent, {width: '800px'});
  }

  showAdminSettings(): void {
    this.dialog.open(AdminComponent, {width: '600px'});
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
