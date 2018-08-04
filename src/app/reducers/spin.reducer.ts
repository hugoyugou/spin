import { Action } from '@ngrx/store';
import { SpinActions, SpinActionTypes } from '../actions/spin.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: SpinActions): State {
  switch (action.type) {

    case SpinActionTypes.LoadSpins:
      return state;


    default:
      return state;
  }
}
