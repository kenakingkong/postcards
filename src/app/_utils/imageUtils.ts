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

    export interface INetlifyImageParamProps extends URLSearchParams {
      url: string;
      w?: number;
      h?: number;
      fit?: "object" | "contain" | "fill";
      position?: "center" | "top" | "bottom" | "left" | "right";
      format?: "avif" | "jpg" | "png" | "webp" | "gif" | "blurhash";
      quality?: number;
    }

    export const getNetlifyUrl = async (data: INetlifyImageParamProps) => {
      const params = new URLSearchParams(data);
      return `${BASE_NETLIFY_URL}?${params.toString()}`;
    };
  }
}

export default ImageUtils;
