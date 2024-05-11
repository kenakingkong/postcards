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

  export namespace Supabase {
    export function getUrl(path: string) {
      const BASE_STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/postcard-uploads`;
      return `${BASE_STORAGE_URL}/${path}`;
    }
  }

  export namespace Netlify {
    const BASE_NETLIFY_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/.netlify/images/`;

    export interface INetlifyImageParamProps {
      url: string;
      w?: number;
      h?: number;
      fit?: string; //"object" | "contain" | "fill";
      position?: string; //"center" | "top" | "bottom" | "left" | "right";
      format?: string; //"avif" | "jpg" | "png" | "webp" | "gif" | "blurhash";
      quality?: number;
    }

    export function getUrl(data: INetlifyImageParamProps) {
      const params = Object.entries(data)
        .map((entry) => `${entry[0]}=${entry[1]}`)
        .join("&");
      return `${BASE_NETLIFY_URL}?${params}`;
    }
  }
}

export default ImageUtils;
