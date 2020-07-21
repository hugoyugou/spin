import { Action } from '@ngrx/store';
import { AnimatedImageActions, AnimatedImageActionTypes } from '../actions/animated-image.actions';

export interface State {}

export const initialState: State = {};

export function reducer(state = initialState, action: AnimatedImageActions): State {
  switch (action.type) {
    case AnimatedImageActionTypes.LoadAnimatedImages:
      return state;

    default:
      return state;
  }
}
