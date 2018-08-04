import { Component, OnInit, Input } from '@angular/core';
import { Frame } from '../../models/Frame.model';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  @Input() frame: Frame;

  constructor() { }

  ngOnInit() {
  }

}
