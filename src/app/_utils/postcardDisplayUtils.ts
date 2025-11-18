namespace PostcardDisplayUtils {
  const NETLIFY_IMG_LONG_EDGE = 864;
  const NETLIFY_IMG_SHORT_EDGE = 576;

  const GALLERY_IMG_LONG_EDGE = 374;
  const GALLERY_IMG_SHORT_EDGE = 249;

  const PREVIEW_IMG_LONG_EDGE = 189;
  const PREVIEW_IMG_SHORT_EDGE = 126;

  const THUMBNAIL_IMG_LONG_EDGE = 150;
  const THUMBNAIL_IMG_SHORT_EDGE = 100;

  export function isLandscape(orientation: string) {
    return orientation == "landscape";
  }

  export function getNetlifyDimensions(isLandscape: boolean) {
    return {
      width: isLandscape ? NETLIFY_IMG_LONG_EDGE : NETLIFY_IMG_SHORT_EDGE,
      height: isLandscape ? NETLIFY_IMG_SHORT_EDGE : NETLIFY_IMG_LONG_EDGE,
    };
  }

  export function getGalleryDimensions(isLandscape: boolean) {
    return {
      width: isLandscape ? GALLERY_IMG_LONG_EDGE : GALLERY_IMG_SHORT_EDGE,
      height: isLandscape ? GALLERY_IMG_SHORT_EDGE : GALLERY_IMG_LONG_EDGE,
    };
  }

  export function getPreviewDimensions(isLandscape: boolean) {
    return {
      width: isLandscape ? PREVIEW_IMG_LONG_EDGE : PREVIEW_IMG_SHORT_EDGE,
      height: isLandscape ? PREVIEW_IMG_SHORT_EDGE : PREVIEW_IMG_LONG_EDGE,
    };
  }

  export function getThumbnailDimensions(isLandscape: boolean) {
    return {
      width: isLandscape ? THUMBNAIL_IMG_LONG_EDGE : THUMBNAIL_IMG_SHORT_EDGE,
      height: isLandscape ? THUMBNAIL_IMG_SHORT_EDGE : THUMBNAIL_IMG_LONG_EDGE,
    };
  }
}

export default PostcardDisplayUtils;
