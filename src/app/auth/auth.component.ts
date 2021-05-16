import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BlockchainService} from '../core/services/blockchain.service';

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
              private formBuilder: FormBuilder) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      contractAddress: ['', Validators.required],
      accountAddress: ['', Validators.required]
    });
  }

  letsGo(): void {
    this.blockchain.setPlayerAddress(this.formGroup.get('accountAddress').value?.trim());
    this.blockchain.setCryptoverseContractAddress(this.formGroup.get('contractAddress').value?.trim());
    this.router.navigate(['/planets']);
  }

}
