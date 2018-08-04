import { Component } from '@angular/core';
import { AnimatedImage } from '../../models/AnimatedImage.model';
import { Frame } from '../../models/Frame.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spin';

  animatedImage: AnimatedImage = {
    current: 0,
    height: 256,
    width: 256,
    frames: [
      {
        id: 0,
        uri: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        delay: 20,
        keep: false,
      } as Frame,
      {
        id: 1,
        uri: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        delay: 20,
        keep: false,
      } as Frame
    ]
  } as AnimatedImage;
}
