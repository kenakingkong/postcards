import { ICustomImage } from "./customImage";
import { IDimensions } from "./dimensions";

export default interface ITemplate {
  id: string;
  name: string;
  fontId: string;

  frontDimensions: IDimensions;
  frontOrientation: string; // "landscape" | "portrait"
  frontBackgroundImageUrl: string;
  frontPreviewImageUrl: string;
  frontCustomImage: ICustomImage;

  backOrientation: string; // "landscape" | "portrait"
  backDimensions: IDimensions;
  backBackgroundImageUrl: string;
  backPreviewImageUrl: string;
  backCustomImage: ICustomImage;
}
