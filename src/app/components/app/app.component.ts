import { Component, OnInit } from '@angular/core';
import { AnimatedImage } from '../../models/AnimatedImage.model';
import { Frame } from '../../models/Frame.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { selectAnimatedImage } from '../../reducers/spin.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spin';

  animatedImage$: Observable<AnimatedImage>;

  constructor(public store: Store<State>){}

  ngOnInit(): void {
    this.animatedImage$ = this.store.select(selectAnimatedImage);
  }
}
