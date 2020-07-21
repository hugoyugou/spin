import { Component, OnInit, Input } from '@angular/core';
import { AnimatedImage } from '../../models/AnimatedImage.model';

@Component({
  selector: 'app-animated-image',
  templateUrl: './animated-image.component.html',
  styleUrls: ['./animated-image.component.css'],
})
export class AnimatedImageComponent implements OnInit {
  @Input() animatedImage: AnimatedImage;

  constructor() {}

  ngOnInit() {}
}
