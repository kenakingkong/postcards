namespace SupabaseUtils {
  export function getLiveUrl(path: string) {
    const BASE_STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/postcard-uploads`;
    return `${BASE_STORAGE_URL}/${path}`;
  }
}

export default SupabaseUtils;
