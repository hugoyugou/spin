import { Injectable, OnDestroy } from '@angular/core';
import { EditableImage } from '../models/EditableImage.model';
import { BlurFilter } from '../../lib/BlurFilter';
import { GIFEncoder } from '../../lib/jsgif/GIFEncoder';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { selectAnimatedImage } from '../reducers/spin.reducer';
import { AnimatedImage } from '../models/AnimatedImage.model';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Frame } from '../models/Frame.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService implements OnDestroy {
  blurFilter = new BlurFilter();
  animatedImage: AnimatedImage;
  animatedImage$: Observable<AnimatedImage>;
  destroy$ = new Subject<boolean>();

  speedToFramesLUT = [1, 50, 40, 30, 25, 20, 15, 12, 8, 6, 5, 4, 3];

  constructor(public store: Store<State>) {
    this.animatedImage$ = this.store.select(selectAnimatedImage);
    this.animatedImage$.pipe(takeUntil(this.destroy$)).subscribe((animatedImage) => {
      this.animatedImage = animatedImage;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  drawImage(image: EditableImage) {
    const { canvas, size, source } = image;
    const context = canvas.getContext('2d');
    context.save();
    context.globalCompositeOperation = 'copy';
    context.drawImage(source, 0, 0, size, size);
    context.restore();
    return image;
  }

  copy(image: EditableImage) {
    const { canvas, size, source } = image;
    const newCanvas = this.copyCanvas(canvas);
    const context = newCanvas.getContext('2d');
    context.save();
    context.globalCompositeOperation = 'copy';
    context.drawImage(canvas, 0, 0, size, size);
    context.restore();
    const newImage = {
      canvas: newCanvas,
      size,
      source,
    } as EditableImage;
    return newImage;
  }

  copyCanvas(canvas: HTMLCanvasElement) {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    return newCanvas;
  }

  circleMask(image: EditableImage) {
    const { canvas, size } = image;
    const halfSize = size / 2;
    const newCanvas = this.copyCanvas(canvas);
    const context = newCanvas.getContext('2d');
    context.save();
    context.beginPath();
    context.arc(halfSize, halfSize, halfSize, 0, 2 * Math.PI);
    context.clip();
    context.globalCompositeOperation = 'copy';
    context.drawImage(canvas, 0, 0);
    context.restore();
    image.canvas = newCanvas;
    return image;
  }

  radialBlur(image: EditableImage, blur: number = 6) {
    const { canvas, size, source } = image;
    const halfSize = size / 2;
    this.blurFilter.p0 = { x: halfSize, y: halfSize };
    this.blurFilter.p1 = { x: size, y: halfSize };
    this.blurFilter.blur = (blur * size) / 256;
    this.blurFilter.blur2 = (blur * size) / 256;
    this.blurFilter.mode = this.blurFilter.CIRCULAR;

    const newCanvas = this.copyCanvas(canvas);
    this.blurFilter.convertImage(newCanvas, canvas);
    image.canvas = newCanvas;
    return image;
  }

  rotate(image: EditableImage, degree: number = 0) {
    const { canvas, size } = image;
    const halfSize = size / 2;
    const newCanvas = this.copyCanvas(canvas);
    const context = newCanvas.getContext('2d');
    context.save();
    context.translate(halfSize, halfSize);
    context.rotate((degree * Math.PI) / 180);
    context.globalCompositeOperation = 'copy';
    context.drawImage(canvas, 0, 0, size, size, -halfSize, -halfSize, size, size);
    context.restore();
    image.canvas = newCanvas;
    return image;
  }

  exportGif() {
    // TODO: Let another action trigger download event
    const encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(20);
    const frames = this.animatedImage.frames;
    const size = this.animatedImage.height;
    const scaleFactor = 0.375;
    const downSize = Math.floor(this.animatedImage.height * scaleFactor);
    const width = downSize;
    const height = downSize;
    encoder.setSize(width, height);
    const pendingFrames: { [id: number]: Frame } = {};
    frames.forEach((frame) => {
      pendingFrames[frame.id] = frame;
    });
    encoder.start();

    encoder.setTransparent(0x36393f);
    Object.keys(pendingFrames)
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      .forEach((id) => {
        const frame: Frame = pendingFrames[id];

        const newCanvas = this.copyCanvas(frame.canvas);
        newCanvas.width = width;
        newCanvas.height = height;

        const context = newCanvas.getContext('2d');
        context.save();
        context.scale(scaleFactor, scaleFactor);
        context.fillStyle = '#36393f';
        context.fillRect(0, 0, size, size);
        context.drawImage(frame.canvas, 0, 0, size, size);
        context.restore();

        encoder.addFrame(context);
      });
    encoder.finish();
    encoder.download('spin-' + Math.floor(new Date().getTime() / 1000) + '.gif');
  }

  speedToFrames(speed: number): number {
    return this.speedToFramesLUT[Math.max(0, Math.min(this.getMaxSpeed(), speed))];
  }

  getMaxSpeed(): number {
    return this.speedToFramesLUT.length - 1;
  }
}
