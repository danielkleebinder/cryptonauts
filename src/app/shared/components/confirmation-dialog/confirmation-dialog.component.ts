import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfirmationDialogModel} from './confirmation-dialog-model';
import {ConfirmationDialogResult} from './confirmation-dialog-result.enum';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {

  private readonly defaultConfig: ConfirmationDialogModel = {
    title: 'Confirmation',
    message: 'Are you sure?',
    cancelText: 'Cancel',
    confirmationText: 'Okay'
  };

  constructor(@Inject(MAT_DIALOG_DATA) public config: Partial<ConfirmationDialogModel>,
              private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
    this.config = {...this.defaultConfig, ...this.config};
  }

  cancel(): void {
    this.dialogRef.close(ConfirmationDialogResult.Cancel);
  }

  confirm(): void {
    this.dialogRef.close(ConfirmationDialogResult.Confirm);
  }
}
