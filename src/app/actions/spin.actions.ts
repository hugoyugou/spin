import { Action } from '@ngrx/store';
import { AnimatedImage } from '../models/AnimatedImage.model';
import { Frame } from '../models/Frame.model';

export enum SpinActionTypes {
  Update = '[Spin] Update',
  Ready = '[Spin] Ready',
  Play = '[Spin] Play',
  Pause = '[Spin] Pause',
  Stop = '[Spin] Stop',
  NextFrame = '[Spin] NextFrame',
}

export class Update implements Action {
  readonly type = SpinActionTypes.Update;
}

export class Ready implements Action {
  readonly type = SpinActionTypes.Ready;

  constructor(public payload: ReadyPayload) { }
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

export interface ReadyPayload {
  size: number
  frame: Frame
}

export type SpinActions =
  | Update
  | Ready
  | Play
  | Pause
  | Stop
  | NextFrame;
