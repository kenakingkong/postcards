import TEMPLATES from "./data/templates";

export default class TemplatePicker {
  availableTemplates(): any[] {
    return Object.values(TEMPLATES);
  }
}
