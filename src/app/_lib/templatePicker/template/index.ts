import TEMPLATES from "../data/templates";
import { CustomImage } from "./customImage";
import { Font } from "./font";
import { ICustomImage } from "./models/customImage";
import { IDimensions } from "./models/dimensions";

export class Template {
  id: string;
  name: string = "";
  font: Font = new Font("");
  front: {
    orientation: string;
    dimensions: IDimensions;
    previewImageUrl: string;
    backgroundImageUrl: string;
    customImage: ICustomImage;
  } = {
    orientation: "Landscape",
    dimensions: { w: 576, h: 384 },
    previewImageUrl: "",
    backgroundImageUrl: "",
    customImage: new CustomImage({ x: 0, y: 0, w: 0, h: 0 }),
  };
  back: {
    orientation: string;
    dimensions: IDimensions;
    previewImageUrl: string;
    backgroundImageUrl: string;
    customImage: ICustomImage;
  } = {
    orientation: "landscape",
    dimensions: { w: 576, h: 384 },
    previewImageUrl: "",
    backgroundImageUrl: "",
    customImage: new CustomImage({ x: 0, y: 0, w: 0, h: 0 }),
  };

  constructor(id: string) {
    this.id = id;

    const template = this.lookupTemplate();
    this.name = template.name;
    this.font = new Font(template.fontId);
    this.front = {
      orientation: template.frontOrientation,
      dimensions: template.frontDimensions,
      previewImageUrl: template.frontPreviewImageUrl,
      backgroundImageUrl: template.frontBackgroundImageUrl,
      customImage: new CustomImage(template.frontCustomImage),
    };
    this.back = {
      orientation: template.backOrientation,
      dimensions: template.backDimensions,
      previewImageUrl: template.backPreviewImageUrl,
      backgroundImageUrl: template.backBackgroundImageUrl,
      customImage: new CustomImage(template.backCustomImage),
    };
  }

  private lookupTemplate() {
    const t = TEMPLATES[this.id as keyof typeof TEMPLATES];
    return {
      ...t,
      frontOrientation: t.frontOrientation || "landscape",
      frontDimensions: this.getDimensions(t.frontOrientation),
      backOrientation: t.backOrientation || "landscape",
      backDimensions: this.getDimensions(t.backOrientation),
    };
  }

  private getDimensions(orientation?: string) {
    if (orientation == "portrait") {
      return { w: 384, h: 576 };
    }
    return { w: 576, h: 384 };
  }
}
