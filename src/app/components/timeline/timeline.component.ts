import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimatedImage } from '../../models/AnimatedImage.model';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { selectAnimatedImage } from '../../reducers/spin.reducer';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  animatedImage$: Observable<AnimatedImage>;

  constructor(public store: Store<State>){}

  ngOnInit(): void {
    this.animatedImage$ = this.store.select(selectAnimatedImage);
  }

}
