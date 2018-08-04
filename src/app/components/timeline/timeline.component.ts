import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimatedImage } from '../../models/AnimatedImage.model';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { selectAnimatedImage, selectIsPause } from '../../reducers/spin.reducer';
import { Play, Pause, Stop } from '../../actions/spin.actions';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  animatedImage$: Observable<AnimatedImage>;
  isPause$: Observable<boolean>;

  constructor(public store: Store<State>){}

  ngOnInit(): void {
    this.animatedImage$ = this.store.select(selectAnimatedImage);
    this.isPause$ = this.store.select(selectIsPause);
  }

  onPlayButtonClick(): void {
    this.store.dispatch(new Play());
  }

  onPauseButtonClick(): void {
    this.store.dispatch(new Pause());
  }

  onStopButtonClick(): void {
    this.store.dispatch(new Stop());    
  }

}
