import jsPDF from "jspdf";

export default class Pdf {
  pdf: jsPDF;

  constructor() {
    this.pdf = new jsPDF({ unit: "in", format: "letter" });
  }

  build(
    frontCanvas: HTMLCanvasElement,
    backCanvas: HTMLCanvasElement,
    rotateFront: boolean = false
  ): string {
    this.buildFrontPage(frontCanvas, rotateFront);
    this.addPage();
    this.buildBackPage(backCanvas);
    return this.getOutputUrl();
  }

  private getOutputUrl() {
    return this.pdf.output("datauristring", {
      filename: "my-postcard.pdf",
    });
  }

  private addPage() {
    this.pdf.addPage("letter", "portrait");
  }

  private buildFrontPage(
    canvas: HTMLCanvasElement,
    shouldRotate: boolean = false
  ) {
    this.pdf.rect(0, 0, 6.025, 8.05, "F");
    if (shouldRotate) {
      this.pdf.addImage(canvas, 0, -6, 4, 6, "fImg", "NONE", 270);
      this.pdf.addImage(canvas, 0, -1.975, 4, 6, "fImg", "NONE", 270);
    } else {
      this.pdf.addImage(canvas, 0, 0, 6, 4, "fImg", "NONE");
      this.pdf.addImage(canvas, 0, 4.025, 6, 4, "fImg", "NONE");
    }
  }

  private buildBackPage(canvas: HTMLCanvasElement) {
    this.pdf.rect(2.5, 0, 6.025, 8.05, "F");
    this.pdf.addImage(canvas, 2.525, 0, 6, 4, "bImg", "NONE");
    this.pdf.addImage(canvas, 2.525, 4.025, 6, 4, "bImg", "NONE");
  }
}
