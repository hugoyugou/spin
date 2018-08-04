import { Component, OnInit } from '@angular/core';
import { AnimatedImage } from '../../models/AnimatedImage.model';
import { Frame } from '../../models/Frame.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { selectAnimatedImage, selectSpeed } from '../../reducers/spin.reducer';
import { SpeedChangePayload, SpeedChange } from '../../actions/spin.actions';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spin';

  animatedImage$: Observable<AnimatedImage>;
  speed$: Observable<number>;
  maxSpeed: number;

  constructor(public imageService: ImageService, public store: Store<State>){}

  ngOnInit(): void {
    this.animatedImage$ = this.store.select(selectAnimatedImage);
    this.speed$ = this.store.select(selectSpeed);
    this.maxSpeed = this.imageService.getMaxSpeed();
  }

  onSpeedChange(speed: number): void {
    const speedChangePayload = {
      speed
    } as SpeedChangePayload;
    this.store.dispatch(new SpeedChange(speedChangePayload));
  }
}
