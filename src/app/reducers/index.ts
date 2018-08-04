import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromSpin from './spin.reducer';

export interface State {

  spin: fromSpin.State;
}

export const reducers: ActionReducerMap<State> = {

  spin: fromSpin.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
