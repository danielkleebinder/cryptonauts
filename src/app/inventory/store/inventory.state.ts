import {EntityState} from '@ngrx/entity';
import {Item} from '../models';

export interface InventoryState extends EntityState<Item> {
  tokens: number;
}
