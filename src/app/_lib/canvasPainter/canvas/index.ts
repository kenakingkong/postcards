import { MouseEvent, RefObject } from "react";
import { IDimensions } from "../../templatePicker/template/models/dimensions";
import { ICustomImage } from "../../templatePicker/template/models/customImage";

export default class Canvas {
  static COLOR_PRIMARY = "#50586c";
  static COLOR_SECONDARY = "#dce2f0";

  ref: RefObject<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | null | undefined;

  constructor(canvasRef: RefObject<HTMLCanvasElement>) {
    this.ref = canvasRef;
  }

  initialize(dimensions: IDimensions) {
    if (!this.ref.current) return;
    if (!this.ref.current.getContext) return;

    this.context = this.ref.current.getContext("2d", { alpha: false });
    if (!this.context) return;

    const dpr = window.devicePixelRatio || 1;

    // set "actual" size of canvas
    this.ref.current.width = dimensions.w * dpr;
    this.ref.current.height = dimensions.h * dpr;

    // scale context for correct drawing operations
    this.context.scale(dpr, dpr);

    // set the "drawn" size of the canvas
    this.ref.current.style.width = `${dimensions.w}px`;
    this.ref.current.style.height = `${dimensions.h}px`;

    // want cleaner images
    this.context.imageSmoothingEnabled = false;
  }

  reset() {
    if (!this.ref.current || !this.context) return;
    this.context.clearRect(
      0,
      0,
      this.ref.current.width,
      this.ref.current.height
    );
  }

  drawImage(image: CanvasImageSource, box: ICustomImage) {
    if (!this.context) return;
    this.context.drawImage(image, box.x, box.y, box.w, box.h);
  }

  drawBackgroundImage(image: HTMLImageElement | null) {
    if (!this.ref.current || !this.context) return;
    if (!image) return;

    this.context.drawImage(
      image,
      0,
      0,
      this.ref.current.clientWidth,
      this.ref.current.clientHeight
    );
  }

  drawPromptRect(box: ICustomImage, prompt: string, strokeColor?: string) {
    if (!this.ref.current || !this.context) return;

    const x = box.x;
    const y = box.y;
    const w = box.w;
    const h = box.h;

    const promptW = this.context.measureText(prompt).width;
    const promptX = x + w / 2 - promptW / 2;
    const promptY = y + h / 2;

    // draw rect
    this.context.fillStyle = "rgba(255,255,255,0.9)";
    this.context.strokeStyle = strokeColor || Canvas.COLOR_SECONDARY;
    this.context.setLineDash([10]);
    this.context.fillRect(x, y, w, h);
    this.context.strokeRect(x, y, w, h);

    // draw prompt
    this.context.setLineDash([]);
    this.context.fillStyle = Canvas.COLOR_PRIMARY;
    this.context.font = "16px sans-serif";
    this.context.fillText(prompt, promptX, promptY);

    this.context.fillStyle = "";
    this.context.strokeStyle = "";
  }

  isCanvasMouseInBox(event: MouseEvent<HTMLCanvasElement>, box: ICustomImage) {
    if (!this.ref.current || !this.context) return false;

    const rect = this.ref.current.getBoundingClientRect();

    const scaleX = this.ref.current.width / rect.width;
    const scaleY = this.ref.current.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    this.context.beginPath();
    this.context.rect(box.x, box.y, box.w, box.h);
    return this.context.isPointInPath(x, y);
  }

  saveCanvasAsBlob(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.ref.current) return reject();

      return this.ref.current.toBlob((blob) =>
        blob ? resolve(blob) : reject()
      );
    });
  }

  setPointerCursor(shouldSet: boolean = false) {
    if (!this.ref.current) return;

    if (shouldSet) {
      this.ref.current.classList.add("cursor-pointer");
    } else {
      this.ref.current.classList.remove("cursor-pointer");
    }
  }
}
