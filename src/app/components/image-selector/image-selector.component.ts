import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { SourceChange, SourceChangePayload } from '../../actions/spin.actions';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnInit {
  constructor(public store: Store<State>) {}

  ngOnInit() {}

  onFileChange(files: FileList): void {
    if (files.length !== 1) return;
    const file = files[0];
    const sourceChangePayload = {
      uri: window.URL.createObjectURL(file),
    } as SourceChangePayload;
    this.store.dispatch(new SourceChange(sourceChangePayload));
  }

  onPickButtonClick(): void {
    document.getElementById('file-picker').click();
  }
}
