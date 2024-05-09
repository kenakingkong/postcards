namespace ImageUtils {
  export const createImageUrl = (file: Blob) => {
    return URL.createObjectURL(file);
  };

  export const revokeObjectURL = (url?: string) => {
    if (!url) return;
    window.URL.revokeObjectURL(url);
  };

  export const getImageBlobFromUrl = async (url: string) => {
    return await fetch(url).then((r) => r.blob());
  };
}

export default ImageUtils;
