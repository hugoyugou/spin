import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { SpinActions, SpinActionTypes } from '../actions/spin.actions';
import { AnimatedImage } from '../models/AnimatedImage.model';

export interface State {
  size: number;
  source: HTMLImageElement;
  speed: number;
  animatedImage: AnimatedImage;
  isPause: boolean;
}

export const defaultImage = new Image();
defaultImage.src = '/assets/img/defaultImage.png';

export const errorImage = new Image();
errorImage.src = '/assets/img/errorImage.png';

export const initialState: State = {
  size: 256,
  source: defaultImage,
  speed: 2,
  animatedImage: {
    current: 0,
    height: 256,
    width: 256,
    frames: [],
  } as AnimatedImage,
  isPause: true,
};

export function reducer(state = initialState, action: SpinActions): State {
  switch (action.type) {
    case SpinActionTypes.SourceLoaded: {
      return {
        ...state,
        source: action.payload.image,
      };
    }

    case SpinActionTypes.Update:
      return state;

    case SpinActionTypes.Ready: {
      const payload = action.payload;
      const frameId = payload.frame.id;
      let existed = false;
      let frames = state.animatedImage.frames.map((frame) => {
        if (frame.id == frameId) {
          existed = true;
          return payload.frame;
        } else {
          return frame;
        }
      });
      if (!existed) {
        frames.push(payload.frame);
      }
      return {
        ...state,
        animatedImage: {
          ...state.animatedImage,
          height: payload.size,
          width: payload.size,
          frames: frames,
        },
      };
    }

    case SpinActionTypes.NextFrame:
      return {
        ...state,
        animatedImage: {
          ...state.animatedImage,
          current: (state.animatedImage.current + 1) % state.animatedImage.frames.length,
        },
      };

    case SpinActionTypes.Play:
      return {
        ...state,
        isPause: false,
      };

    case SpinActionTypes.Stop:
      return {
        ...state,
        isPause: true,
        animatedImage: {
          ...state.animatedImage,
          current: 0,
        },
      };

    case SpinActionTypes.Pause:
      return {
        ...state,
        isPause: true,
      };

    case SpinActionTypes.SpeedChange:
      return {
        ...state,
        speed: action.payload.speed,
      };

    case SpinActionTypes.PrepareFrames: {
      return {
        ...state,
        animatedImage: {
          ...state.animatedImage,
          frames: state.animatedImage.frames.filter((frame) => frame.id < action.payload.totalFrames),
        },
      };
    }

    default:
      return state;
  }
}

export const selectSpin = createFeatureSelector('spin');

export const selectSize = createSelector(selectSpin, (state: State) => state.size);

export const selectSource = createSelector(selectSpin, (state: State) => state.source);

export const selectSpeed = createSelector(selectSpin, (state: State) => state.speed);

export const selectAnimatedImage = createSelector(selectSpin, (state: State) => state.animatedImage);

export const selectIsPause = createSelector(selectSpin, (state: State) => state.isPause);
