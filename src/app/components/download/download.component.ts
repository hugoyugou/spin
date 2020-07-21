import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Download } from '../../actions/spin.actions';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  constructor(public store: Store<State>) {}

  ngOnInit() {}

  onDownloadButtonClick(): void {
    this.store.dispatch(new Download());
  }
}
