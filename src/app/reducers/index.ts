import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromSpin from './spin.reducer';
import * as fromPreview from './preview.reducer';

export interface State {

  spin: fromSpin.State;
  preview: fromPreview.State;
}

export const reducers: ActionReducerMap<State> = {

  spin: fromSpin.reducer,
  preview: fromPreview.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
