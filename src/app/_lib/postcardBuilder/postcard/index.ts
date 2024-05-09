import ImageUtils from "@/_utils/imageUtils";
import { IPostcard } from "./models/postcard";

export class Postcard {
  static FRONT_IMG_URL = "frontImageUrl";
  static BACK_IMG_URL = "backImageUrl";
  static PDF_URL = "pdfUrl";
  static PROPERTIES = [
    Postcard.FRONT_IMG_URL,
    Postcard.BACK_IMG_URL,
    Postcard.PDF_URL,
  ];

  frontImageUrl?: string;
  backImageUrl?: string;
  pdfUrl?: string;

  constructor(props: IPostcard) {
    this.frontImageUrl = props.frontImageUrl;
    this.backImageUrl = props.backImageUrl;
    this.pdfUrl = props.pdfUrl;
  }

  isValidProperty(property: string) {
    return Postcard.PROPERTIES.includes(property);
  }

  setProperty(property: string, url?: string) {
    switch (property) {
      case Postcard.FRONT_IMG_URL:
        this.frontImageUrl = url;
        return;
      case Postcard.BACK_IMG_URL:
        this.backImageUrl = url;
        return;
      case Postcard.PDF_URL:
        this.pdfUrl = url;
        return;
    }
  }

  getPropertyValue(property: string) {
    switch (property) {
      case Postcard.FRONT_IMG_URL:
        return this.frontImageUrl;
      case Postcard.BACK_IMG_URL:
        return this.backImageUrl;
      case Postcard.PDF_URL:
        return this.pdfUrl;
      default:
        return undefined;
    }
  }

  clear() {
    Postcard.PROPERTIES.forEach((property) => {
      ImageUtils.revokeObjectURL(this.getPropertyValue(property));
      this.setProperty(property, undefined);
    });
  }
}
