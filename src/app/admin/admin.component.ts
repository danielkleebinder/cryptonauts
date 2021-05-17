import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {filter} from 'rxjs/operators';
import {AddItemComponent} from './add-item/add-item.component';
import {AddOwnerComponent} from './add-owner/add-owner.component';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogModel,
  ConfirmationDialogResult
} from '../shared/components/confirmation-dialog';
import {AdminFacade} from './store';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  contractBalance$ = this.adminFacade.contractBalance$;

  constructor(private adminFacade: AdminFacade,
              private dialog: MatDialog) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.adminFacade.loadContractBalance();
  }

  addItem(): void {
    this.dialog.open(AddItemComponent, {width: '400px'});
  }

  addOwner(): void {
    this.dialog.open(AddOwnerComponent, {width: '400px'});
  }

  renounceOwnership(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Renounce your ownership',
        message: 'Are you sure that you want to renounce your ownership? Only other owners will be able to add you back again.',
        confirmationText: 'Renounce'
      } as ConfirmationDialogModel
    }).afterClosed()
      .pipe(filter(res => res === ConfirmationDialogResult.Confirm))
      .subscribe(() => this.adminFacade.renounceOwner());
  }

  redeemEther(): void {
    this.adminFacade.redeemEther();
    this.adminFacade.loadContractBalance();
  }
}
