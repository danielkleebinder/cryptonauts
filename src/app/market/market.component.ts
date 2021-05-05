import {ChangeDetectionStrategy, Component, OnInit, TrackByFunction} from '@angular/core';
import {MarketFacade} from './store';
import {InventoryFacade} from '../inventory/store';
import {Item} from '../inventory/models';


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketComponent implements OnInit {

  market$ = this.marketFacade.market$;
  tokens$ = this.inventoryFacade.tokens$;

  // Improve performance by using a tracking function
  trackByItemId: TrackByFunction<Item> = (index, item) => item.id;

  constructor(private marketFacade: MarketFacade,
              private inventoryFacade: InventoryFacade) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.marketFacade.loadMarket();
    this.inventoryFacade.loadTokens();
  }

  buyItem(itemTypeId: number): void {
    this.marketFacade.buyItem(itemTypeId);
  }
}
