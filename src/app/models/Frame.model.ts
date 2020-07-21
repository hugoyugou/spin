export interface Frame {
  id: number;
  uri?: string;
  delay: number;
  keep?: boolean;
  canvas: HTMLCanvasElement;
}
