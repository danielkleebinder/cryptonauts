import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {InventoryFacade} from '../store';

@Component({
  selector: 'app-buy-tokens',
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyTokensComponent implements OnInit {

  tokenPrice$ = this.inventoryFacade.tokenPrice$;
  playerBalance$ = this.inventoryFacade.playerBalance$;

  diamondsFormControl = this.formBuilder.control(0, Validators.compose([
    Validators.min(1),
    Validators.required
  ]));

  constructor(private inventoryFacade: InventoryFacade,
              private formBuilder: FormBuilder) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.inventoryFacade.loadTokenPrice();
    this.inventoryFacade.loadPlayerBalance();
  }

  buyTokens(): void {
    this.inventoryFacade.buyTokens(this.diamondsFormControl.value);
  }
}
