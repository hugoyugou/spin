import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SpinActionTypes, Ready, Update, ReadyPayload, NextFrame } from '../actions/spin.actions';
import { withLatestFrom, map, mergeMap, switchMap, takeUntil, mapTo } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { selectSource, selectSpeed, selectSize } from '../reducers/spin.reducer';
import { ImageService } from '../services/image.service';
import { EditableImage } from '../models/EditableImage.model';
import { Frame } from '../models/Frame.model';
import { from, timer } from 'rxjs';

@Injectable()
export class SpinEffects {

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
    map((payload) => {
      const { image } = payload;
      payload.image = this.imageService.circleMask(image);
      return payload;
    }),
    mergeMap((payload) => {
      const { image, options } = payload;
      const { speed } = options;
      let totalFrames = speedToFrames(speed);
      let frameArray = Array.from(Array(totalFrames).keys());
      return from(frameArray).pipe(
        map((frameId) => {
          return {
            image,
            options: {
              ...options,
              id: frameId
            }
          };
        }),
        map(payload => {
          const { image } = payload;
          payload.image = this.imageService.rotate(image, 360 / totalFrames);
          return payload;
        })
      )
    }),
    map((payload) => {
      const { image, options } = payload;
      const { size } = image;
      const { id } = options;
      const frame = {
        id,
        uri: image.canvas.toDataURL(),
        delay: 200,
        keep: false,
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
    switchMap(() => timer(0, 20).pipe(
      takeUntil(this.actions$.ofType(SpinActionTypes.Pause, SpinActionTypes.Pause)),
      mapTo(new NextFrame())
    ))
  );

  constructor(private actions$: Actions, private store$: Store<State>, private imageService: ImageService) {
    (<any>window).store = this.store$;
  }
}

interface SpinPayload {
  image: EditableImage
  options: SpinOptions
}

interface SpinOptions {
  id: number
  blur: boolean
  speed: number
  clockwise: boolean
}

const speedToFramesLUT = [
  1, 50, 25, 12, 6, 3
];

const speedToFrames = (speed: number) => {
  return speedToFramesLUT[
    Math.max(
      0,
      Math.min(
        speedToFramesLUT.length - 1,
        speed
      )
    )
  ]
}