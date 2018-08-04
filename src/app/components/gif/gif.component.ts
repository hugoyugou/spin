import { Component, OnInit, Input } from '@angular/core';
import { Gif } from '../../models/Gif.model';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.css']
})
export class GifComponent implements OnInit {
  @Input() gif: Gif;

  constructor() { }

  ngOnInit() {
  }

}
