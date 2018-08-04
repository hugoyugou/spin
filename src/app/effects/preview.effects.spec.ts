import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PreviewEffects } from './preview.effects';

describe('PreviewEffects', () => {
  let actions$: Observable<any>;
  let effects: PreviewEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PreviewEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PreviewEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
