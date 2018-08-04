import { Injectable } from '@angular/core';
import { EditableImage } from '../models/EditableImage.model';
import { BlurFilter } from './blur';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  blurFilter = new BlurFilter();

  constructor() { }

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
    this.blurFilter.blur = blur;
    this.blurFilter.blur2 = blur;
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
    context.rotate(degree * Math.PI / 180);
    context.globalCompositeOperation = 'copy';
    context.drawImage(
      canvas,
      0, 0, size, size,
      -halfSize, -halfSize, size, size
    );
    context.restore();
    image.canvas = newCanvas;
    return image;
  }

}
