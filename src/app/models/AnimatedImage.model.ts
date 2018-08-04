import { Frame } from "./Frame.model";

export interface AnimatedImage {
    height: number
    width: number
    frames: Frame[]
    current: number
}