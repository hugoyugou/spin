import { Action } from '@ngrx/store';

export enum PreviewActionTypes {
  LoadPreviews = '[Preview] Load Previews'
}

export class LoadPreviews implements Action {
  readonly type = PreviewActionTypes.LoadPreviews;
}

export type PreviewActions = LoadPreviews;
