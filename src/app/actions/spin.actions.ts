import { Action } from '@ngrx/store';
import { AnimatedImage } from '../models/AnimatedImage.model';
import { Frame } from '../models/Frame.model';

export enum SpinActionTypes {
  SourceChange = '[Spin] SourceChange',
  SourceLoaded = '[Spin] SourceLoaded',
  Update = '[Spin] Update',
  Ready = '[Spin] Ready',
  Play = '[Spin] Play',
  Pause = '[Spin] Pause',
  Stop = '[Spin] Stop',
  NextFrame = '[Spin] NextFrame',
  Download = '[Spin] Download',
  SpeedChange = '[Spin] SpeedChange',
  PrepareFrames = '[Spin] PrepareFrames',
}

export class SourceChange implements Action {
  readonly type = SpinActionTypes.SourceChange;
  
  constructor(public payload: SourceChangePayload) { }
}

export interface SourceChangePayload {
  uri: string
}

export class SourceLoaded implements Action {
  readonly type = SpinActionTypes.SourceLoaded;
  
  constructor(public payload: SourceLoadedPayload) { }
}

export interface SourceLoadedPayload {
  image: HTMLImageElement
}

export class Update implements Action {
  readonly type = SpinActionTypes.Update;
}

export class Ready implements Action {
  readonly type = SpinActionTypes.Ready;

  constructor(public payload: ReadyPayload) { }
}

export interface ReadyPayload {
  size: number
  frame: Frame
}

export class Play implements Action {
  readonly type = SpinActionTypes.Play;
}

export class Pause implements Action {
  readonly type = SpinActionTypes.Pause;
}

export class Stop implements Action {
  readonly type = SpinActionTypes.Stop;
}

export class NextFrame implements Action {
  readonly type = SpinActionTypes.NextFrame;
}

export class Download implements Action {
  readonly type = SpinActionTypes.Download;
}

export class SpeedChange implements Action {
  readonly type = SpinActionTypes.SpeedChange;

  constructor(public payload: SpeedChangePayload) { }
}

export interface SpeedChangePayload {
  speed: number
}

export class PrepareFrames implements Action {
  readonly type = SpinActionTypes.PrepareFrames;

  constructor(public payload: PrepareFramesPayload) { }
}

export interface PrepareFramesPayload {
  totalFrames: number
}

export type SpinActions =
  | SourceChange
  | SourceLoaded
  | Update
  | Ready
  | Play
  | Pause
  | Stop
  | NextFrame
  | Download
  | SpeedChange
  | PrepareFrames
