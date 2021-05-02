import {ActionReducer, MetaReducer} from '@ngrx/store';
import {Logger} from './core/utils';

const log = Logger.getLogger('NgRx');

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const result = reducer(state, action);
    log.debug('New app state:', result, 'after action:', action.type);
    return result;
  };
}

export const metaReducers: MetaReducer<any>[] = [logger];
