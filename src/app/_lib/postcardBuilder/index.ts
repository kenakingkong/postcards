import ImageUtils from "@/_utils/imageUtils";
import { Template } from "../templatePicker/template";
import { IAddress } from "../templatePicker/template/models/address";

export default class PostcardBuilder {
  template?: Template;
  customImageUrl?: string;
  address?: IAddress;

  reset() {
    this.setCustomImageUrl(undefined);
    this.address = undefined;
    this.template = undefined;
  }

  hasTemplate(): boolean {
    return !!this.template;
  }

  hasAddress() {
    return !!this.address;
  }

  hasCustomImageUrl() {
    return !!this.customImageUrl;
  }

  setCustomImageUrl(url?: string) {
    this.revokeCustomImage();
    this.customImageUrl = url;
  }

  setAddress(address?: IAddress) {
    this.address = address;
  }

  setTemplate(id: string) {
    this.revokeCustomImage();
    this.template = new Template(id);
  }

  generateFileName(type: string, ext: string) {
    return `${
      this.template?.id || "template"
    }-${type}-${new Date().getTime()}${ext}`;
  }

  private revokeCustomImage() {
    ImageUtils.revokeObjectURL(this.customImageUrl);
  }
}
