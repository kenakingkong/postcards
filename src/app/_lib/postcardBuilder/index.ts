import ImageUtils from "@/_utils/imageUtils";
import { Postcard } from "./postcard";
import { Template } from "../templatePicker/template";
import { IAddress } from "../templatePicker/template/models/address";

export default class PostcardBuilder {
  postcard?: Postcard;
  template?: Template;
  customImageUrl?: string;
  address?: IAddress;

  reset() {
    this.postcard?.clear();

    this.setCustomImageUrl(undefined);
    this.postcard = undefined;
    this.address = undefined;
    this.template = undefined;
  }

  hasTemplate(): boolean {
    return !!this.template;
  }

  hasFrontAndBack(): boolean {
    return !!this.postcard?.frontImageUrl && !!this.postcard.backImageUrl;
  }

  hasAddress() {
    return !!this.address;
  }

  hasCustomImageUrl() {
    return !!this.customImageUrl;
  }

  setCustomImageUrl(url?: string) {
    ImageUtils.revokeObjectURL(this.customImageUrl);
    this.customImageUrl = url;
  }

  setAddress(address?: IAddress) {
    this.address = address;
  }

  setTemplate(id: string) {
    this.revokeImages();
    this.template = new Template(id);
  }

  getUrl(property: string) {
    if (!this.postcard) return undefined;

    return this.postcard.getPropertyValue(property);
  }

  setUrl(property: string, imageUrl: string) {
    if (!this.template) return;

    if (!this.postcard) {
      this.postcard = new Postcard({ templateId: this.template.id });
    }

    if (this.postcard.isValidProperty(property)) {
      this.postcard.setProperty(property, imageUrl);
    }
  }

  private revokeImages() {
    ImageUtils.revokeObjectURL(this.customImageUrl);
    this.postcard?.clear();
  }
}
