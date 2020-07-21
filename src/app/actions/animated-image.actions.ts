import { Action } from '@ngrx/store';

export enum AnimatedImageActionTypes {
  LoadAnimatedImages = '[AnimatedImage] Load AnimatedImages',
}

export class LoadAnimatedImages implements Action {
  readonly type = AnimatedImageActionTypes.LoadAnimatedImages;
}

export type AnimatedImageActions = LoadAnimatedImages;
