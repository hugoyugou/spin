import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AnimatedImageEffects } from './animated-image.effects';

describe('AnimatedImageEffects', () => {
  let actions$: Observable<any>;
  let effects: AnimatedImageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimatedImageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AnimatedImageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
