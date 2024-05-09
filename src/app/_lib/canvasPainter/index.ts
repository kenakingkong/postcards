import { MouseEvent, RefObject } from "react";
import Canvas from "./canvas";
import { IDimensions } from "../templatePicker/template/models/dimensions";
import { ICustomImage } from "../templatePicker/template/models/customImage";

class CanvasPainter {
  canvas: Canvas;
  canvasRef: RefObject<HTMLCanvasElement>;
  bgImageRef: RefObject<HTMLImageElement>;
  prompt: string;
  dimensions: IDimensions;
  promptBox: ICustomImage;

  constructor(
    canvasRef: RefObject<HTMLCanvasElement>,
    bgImageRef: RefObject<HTMLImageElement>,
    prompt: string,
    promptBox?: ICustomImage,
    dimensions?: IDimensions
  ) {
    this.canvas = new Canvas(canvasRef);
    this.canvasRef = canvasRef;
    this.bgImageRef = bgImageRef;
    this.prompt = prompt;
    this.promptBox = promptBox || { x: 0, y: 0, w: 0, h: 0 };
    this.dimensions = dimensions || { w: 0, h: 0 };
  }

  initialize() {
    this.canvas.initialize(this.dimensions);
  }

  getCanvas() {
    return this.canvas;
  }

  paintBase() {
    this.canvas.reset();
    this.canvas.drawBackgroundImage(this.bgImageRef.current);
  }

  paintPromptedBase() {
    this.canvas.reset();
    this.canvas.drawBackgroundImage(this.bgImageRef.current);
    this.canvas.drawPromptRect(this.promptBox, this.prompt);
    this.canvas.setPointerCursor(false);
  }

  paintHoveredPromptedBase() {
    this.canvas.reset();
    this.canvas.drawBackgroundImage(this.bgImageRef.current);
    this.canvas.drawPromptRect(
      this.promptBox,
      this.prompt,
      Canvas.COLOR_PRIMARY
    );
    this.canvas.setPointerCursor(true);
  }

  isMouseInPromptBox(event: MouseEvent<HTMLCanvasElement>) {
    return this.canvas.isCanvasMouseInBox(event, this.promptBox);
  }

  saveCanvasAsBlob() {
    return this.canvas.saveCanvasAsBlob();
  }

  saveCanvasAsPdf() {
    
  }
}

export default CanvasPainter;
