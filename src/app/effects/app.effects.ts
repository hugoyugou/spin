import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mapTo, delay } from 'rxjs/operators';
import { Update } from '../actions/spin.actions';

@Injectable()
export class AppEffects {
  @Effect()
  init$ = this.actions$.pipe(ofType('@ngrx/effects/init'), delay(500), mapTo(new Update()));

  constructor(private actions$: Actions) {}
}
