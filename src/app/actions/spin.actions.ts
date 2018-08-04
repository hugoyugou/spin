import { Action } from '@ngrx/store';

export enum SpinActionTypes {
  LoadSpins = '[Spin] Load Spins'
}

export class LoadSpins implements Action {
  readonly type = SpinActionTypes.LoadSpins;
}

export type SpinActions = LoadSpins;
