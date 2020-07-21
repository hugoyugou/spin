import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  SpinActionTypes,
  Ready,
  Update,
  ReadyPayload,
  NextFrame,
  SourceChange,
  SourceLoaded,
  SourceLoadedPayload,
  PrepareFrames,
  PrepareFramesPayload,
} from '../actions/spin.actions';
import {
  withLatestFrom,
  map,
  mergeMap,
  switchMap,
  takeUntil,
  mapTo,
  debounce,
  debounceTime,
  tap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { selectSource, selectSpeed, selectSize, errorImage } from '../reducers/spin.reducer';
import { ImageService } from '../services/image.service';
import { EditableImage } from '../models/EditableImage.model';
import { Frame } from '../models/Frame.model';
import { from, timer } from 'rxjs';

@Injectable()
export class SpinEffects {
  @Effect()
  spinSourceChange$ = this.actions$.pipe(
    ofType(SpinActionTypes.SourceChange),
    map((action: SourceChange) => action.payload),
    switchMap((payload) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = payload.uri;
        image.addEventListener('load', () => {
          const sourceLoadedPayload = {
            image,
          } as SourceLoadedPayload;
          resolve(new SourceLoaded(sourceLoadedPayload));
        });
        image.addEventListener('error', () => {
          const sourceLoadedPayload = {
            image: errorImage,
          } as SourceLoadedPayload;
          resolve(new SourceLoaded(sourceLoadedPayload));
        });
      });
    })
  );

  @Effect()
  spinSourceLoaded$ = this.actions$.pipe(ofType(SpinActionTypes.SourceLoaded), mapTo(new Update()));

  @Effect()
  spinUpdate$ = this.actions$.pipe(
    ofType(SpinActionTypes.Update),
    withLatestFrom(this.store$.select(selectSize)),
    withLatestFrom(this.store$.select(selectSource)),
    withLatestFrom(this.store$.select(selectSpeed)),
    map(([[[action, size], source], speed]) => {
      let canvas = document.createElement('canvas');
      canvas.height = size;
      canvas.width = size;
      let image = {
        size,
        canvas,
        source,
      } as EditableImage;
      const options = {
        blur: true,
        speed,
        clockwise: true,
      } as SpinOptions;
      return { image, options };
    }),
    map((payload) => {
      const { image } = payload;
      payload.image = this.imageService.drawImage(image);
      return payload;
    }),
    map((payload) => {
      const { image, options } = payload;
      const { speed } = options;
      const blurFactor = speed;
      payload.image = this.imageService.radialBlur(image, blurFactor);
      return payload;
    }),
    tap((payload) => {
      const { image, options } = payload;
      const { speed } = options;
      let totalFrames = this.imageService.speedToFrames(speed);
      // Anti-pattern
      const prepareFramesPayload = {
        totalFrames,
      } as PrepareFramesPayload;
      this.store$.dispatch(new PrepareFrames(prepareFramesPayload));
    }),
    mergeMap((payload) => {
      const { image, options } = payload;
      const { speed } = options;
      let totalFrames = this.imageService.speedToFrames(speed);
      let frameArray = Array.from(Array(totalFrames).keys());
      return from(frameArray).pipe(
        map((frameId) => {
          return {
            image: this.imageService.copy(image),
            options: {
              ...options,
              id: frameId,
            },
          };
        }),
        map((payload) => {
          const { image } = payload;
          payload.image = this.imageService.rotate(image, (payload.options.id * 360) / totalFrames);
          return payload;
        })
      );
    }),
    map((payload) => {
      const { image } = payload;
      payload.image = this.imageService.circleMask(image);
      return payload;
    }),
    map((payload) => {
      const { image, options } = payload;
      const { size, canvas } = image;
      const { id } = options;
      const frame = {
        id,
        uri: canvas.toDataURL(),
        delay: 200,
        keep: false,
        canvas,
      } as Frame;
      const readyPayload = {
        size,
        frame,
      } as ReadyPayload;
      return new Ready(readyPayload);
    })
  );

  // @Effect({ dispatch: false })
  // spinReady$ = this.actions$.pipe(
  //   ofType(SpinActionTypes.Ready),
  //   map(payload => {

  //   })
  // );

  @Effect()
  playback$ = this.actions$.pipe(
    ofType(SpinActionTypes.Play),
    switchMap(() =>
      timer(0, 20).pipe(
        takeUntil(this.actions$.pipe(ofType(SpinActionTypes.Pause, SpinActionTypes.Stop))),
        mapTo(new NextFrame())
      )
    )
  );

  // TODO: Dispatch success/fail action
  @Effect({ dispatch: false })
  download$ = this.actions$.pipe(
    ofType(SpinActionTypes.Download),
    debounceTime(500),
    map(() => {
      // TODO: Use switchMap instead
      this.imageService.exportGif();
    })
  );

  @Effect()
  speedUpdate$ = this.actions$.pipe(ofType(SpinActionTypes.SpeedChange), debounceTime(100), mapTo(new Update()));

  constructor(private actions$: Actions, private store$: Store<State>, private imageService: ImageService) {
    (<any>window).store = this.store$;
  }
}

interface SpinPayload {
  image: EditableImage;
  options: SpinOptions;
}

interface SpinOptions {
  id: number;
  blur: boolean;
  speed: number;
  clockwise: boolean;
}
