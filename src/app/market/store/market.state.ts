import {EntityState} from '@ngrx/entity';
import {Item} from '../../inventory/models';

export interface MarketState extends EntityState<Item> {
}
