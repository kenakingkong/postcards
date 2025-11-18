import TemplatePicker from '../../src/app/_lib/templatePicker';

describe('TemplatePicker', () => {
  let templatePicker: TemplatePicker;

  beforeEach(() => {
    templatePicker = new TemplatePicker();
  });

  describe('availableTemplates', () => {
    it('should return an array of templates', () => {
      const templates = templatePicker.availableTemplates();

      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
    });

    it('should return templates with required properties', () => {
      const templates = templatePicker.availableTemplates();

      templates.forEach((template) => {
        expect(template).toHaveProperty('id');
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('frontOrientation');
        expect(template).toHaveProperty('frontBackgroundImageUrl');
        expect(template).toHaveProperty('frontPreviewImageUrl');
        expect(template).toHaveProperty('frontCustomImage');
        expect(template).toHaveProperty('backOrientation');
        expect(template).toHaveProperty('backBackgroundImageUrl');
        expect(template).toHaveProperty('backPreviewImageUrl');
        expect(template).toHaveProperty('backCustomImage');
      });
    });

    it('should return templates with valid custom image dimensions', () => {
      const templates = templatePicker.availableTemplates();

      templates.forEach((template) => {
        expect(template.frontCustomImage).toHaveProperty('x');
        expect(template.frontCustomImage).toHaveProperty('y');
        expect(template.frontCustomImage).toHaveProperty('w');
        expect(template.frontCustomImage).toHaveProperty('h');

        expect(template.backCustomImage).toHaveProperty('x');
        expect(template.backCustomImage).toHaveProperty('y');
        expect(template.backCustomImage).toHaveProperty('w');
        expect(template.backCustomImage).toHaveProperty('h');

        // Validate dimensions are positive numbers
        expect(template.frontCustomImage.w).toBeGreaterThan(0);
        expect(template.frontCustomImage.h).toBeGreaterThan(0);
        expect(template.backCustomImage.w).toBeGreaterThan(0);
        expect(template.backCustomImage.h).toBeGreaterThan(0);
      });
    });

    it('should include specific known templates', () => {
      const templates = templatePicker.availableTemplates();
      const templateIds = templates.map((t) => t.id);

      expect(templateIds).toContain('thanks-template-1');
      expect(templateIds).toContain('thanks-template-2');
      expect(templateIds).toContain('thanks-template-3');
    });

    it('should return templates with valid orientations', () => {
      const templates = templatePicker.availableTemplates();
      const validOrientations = ['landscape', 'portrait'];

      templates.forEach((template) => {
        expect(validOrientations).toContain(template.frontOrientation);
        expect(validOrientations).toContain(template.backOrientation);
      });
    });

    it('should return unique templates', () => {
      const templates = templatePicker.availableTemplates();
      const templateIds = templates.map((t) => t.id);
      const uniqueIds = new Set(templateIds);

      expect(uniqueIds.size).toBe(templateIds.length);
    });

    it('should return the same templates on multiple calls', () => {
      const templates1 = templatePicker.availableTemplates();
      const templates2 = templatePicker.availableTemplates();

      expect(templates1).toEqual(templates2);
    });
  });
});
