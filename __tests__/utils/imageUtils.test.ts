import ImageUtils from '../../src/app/_utils/imageUtils';

describe('ImageUtils', () => {
  describe('createImageUrl', () => {
    it('should create object URL from blob', () => {
      const mockBlob = new Blob(['test'], { type: 'image/png' });
      const mockUrl = 'blob:http://localhost:3000/test-id';

      // Mock URL.createObjectURL
      global.URL.createObjectURL = jest.fn(() => mockUrl);

      const result = ImageUtils.createImageUrl(mockBlob);

      expect(result).toBe(mockUrl);
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
    });
  });

  describe('revokeObjectURL', () => {
    beforeEach(() => {
      // Mock window.URL.revokeObjectURL
      global.URL.revokeObjectURL = jest.fn();
    });

    it('should revoke object URL', () => {
      const testUrl = 'blob:http://localhost:3000/test-id';

      ImageUtils.revokeObjectURL(testUrl);

      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(testUrl);
    });

    it('should not throw when url is undefined', () => {
      expect(() => {
        ImageUtils.revokeObjectURL(undefined);
      }).not.toThrow();

      expect(global.URL.revokeObjectURL).not.toHaveBeenCalled();
    });

    it('should not throw when url is empty string', () => {
      expect(() => {
        ImageUtils.revokeObjectURL('');
      }).not.toThrow();

      expect(global.URL.revokeObjectURL).not.toHaveBeenCalled();
    });
  });

  describe('getImageBlobFromUrl', () => {
    it('should fetch and return blob from URL', async () => {
      const mockBlob = new Blob(['image data'], { type: 'image/png' });
      const testUrl = 'https://example.com/image.png';

      // Mock fetch
      global.fetch = jest.fn().mockResolvedValue({
        blob: jest.fn().mockResolvedValue(mockBlob),
      });

      const result = await ImageUtils.getImageBlobFromUrl(testUrl);

      expect(result).toBe(mockBlob);
      expect(global.fetch).toHaveBeenCalledWith(testUrl);
    });

    it('should handle fetch errors', async () => {
      const testUrl = 'https://example.com/image.png';

      // Mock fetch to reject
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(ImageUtils.getImageBlobFromUrl(testUrl)).rejects.toThrow('Network error');
    });
  });

  describe('Supabase.getUrl', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should construct correct Supabase storage URL', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
      const path = 'user123/image.png';

      const result = ImageUtils.Supabase.getUrl(path);

      expect(result).toBe(
        'https://example.supabase.co/storage/v1/object/public/postcard-uploads/user123/image.png'
      );
    });

    it('should handle paths with leading slash', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
      const path = '/user123/image.png';

      const result = ImageUtils.Supabase.getUrl(path);

      expect(result).toBe(
        'https://example.supabase.co/storage/v1/object/public/postcard-uploads//user123/image.png'
      );
    });
  });

  describe('Netlify.getUrl', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should construct Netlify image URL with single parameter', () => {
      const result = ImageUtils.Netlify.getUrl({
        url: 'https://example.com/image.png',
      });

      // Check that URL contains the expected structure
      expect(result).toContain('/.netlify/images/?');
      expect(result).toContain('url=https://example.com/image.png');
    });

    it('should construct Netlify image URL with multiple parameters', () => {
      const result = ImageUtils.Netlify.getUrl({
        url: 'https://example.com/image.png',
        w: 800,
        h: 600,
        fit: 'contain',
        quality: 85,
      });

      expect(result).toContain('/.netlify/images/?');
      expect(result).toContain('url=https://example.com/image.png');
      expect(result).toContain('w=800');
      expect(result).toContain('h=600');
      expect(result).toContain('fit=contain');
      expect(result).toContain('quality=85');
    });

    it('should handle optional parameters', () => {
      const result = ImageUtils.Netlify.getUrl({
        url: 'https://example.com/image.png',
        w: 400,
        format: 'webp',
      });

      expect(result).toContain('/.netlify/images/?');
      expect(result).toContain('url=https://example.com/image.png');
      expect(result).toContain('w=400');
      expect(result).toContain('format=webp');
      expect(result).not.toContain('h=');
      expect(result).not.toContain('quality=');
    });
  });
});
