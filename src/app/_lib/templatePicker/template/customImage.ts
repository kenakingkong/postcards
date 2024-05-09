import { ICustomImage } from "./models/customImage";

export class CustomImage {
  x: number;
  y: number;
  w: number;
  h: number;

  constructor(props: ICustomImage) {
    this.x = props.x;
    this.y = props.y;
    this.w = props.w;
    this.h = props.h;
  }
}
