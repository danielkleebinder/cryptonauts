import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BlockchainService} from '../core/services/blockchain.service';
import {AdminFacade} from '../admin/store';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private router: Router,
              private blockchain: BlockchainService,
              private adminFacade: AdminFacade,
              private formBuilder: FormBuilder) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.blockchain.logout();
    this.formGroup = this.formBuilder.group({
      contractAddress: ['', Validators.required],
      accountAddress: ['', Validators.required]
    });
  }

  letsGo(): void {
    this.blockchain.setPlayerAddress(this.formGroup.get('accountAddress').value?.trim());
    this.blockchain.setCryptoverseContractAddress(this.formGroup.get('contractAddress').value?.trim());
    this.blockchain.contractActive$
      .pipe(take(1))
      .subscribe(() => {
        this.adminFacade.loadOwnership();
        this.router.navigate(['/me']);
      });
  }
}
