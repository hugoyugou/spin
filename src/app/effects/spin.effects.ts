import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SpinActionTypes } from '../actions/spin.actions';

@Injectable()
export class SpinEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(SpinActionTypes.LoadSpins));

  constructor(private actions$: Actions) {}
}
