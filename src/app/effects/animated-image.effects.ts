import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AnimatedImageActionTypes } from '../actions/animated-image.actions';

@Injectable()
export class AnimatedImageEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(AnimatedImageActionTypes.LoadAnimatedImages));

  constructor(private actions$: Actions) {}
}
