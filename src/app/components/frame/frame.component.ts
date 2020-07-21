import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Frame } from '../../models/Frame.model';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  private _frame: Frame;
  @Input() set frame(value: Frame) {
    this._frame = value;
    this.canvas.nativeElement.getContext('2d').drawImage(value.canvas, 0, 0, 256, 256);
  }
  get frame() {
    return this._frame;
  }

  constructor() {}

  ngOnInit() {}
}
