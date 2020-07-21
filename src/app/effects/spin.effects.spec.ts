import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SpinEffects } from './spin.effects';

describe('SpinEffects', () => {
  // tslint:disable: prefer-const
  let actions$: Observable<any>;
  let effects: SpinEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(SpinEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
