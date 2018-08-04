import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PreviewActionTypes } from '../actions/preview.actions';

@Injectable()
export class PreviewEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(PreviewActionTypes.LoadPreviews));

  constructor(private actions$: Actions) {}
}
