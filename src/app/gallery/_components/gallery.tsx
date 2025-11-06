import IPostcard from "@/_lib/postcard/models/postcard";
import { createClient } from "@/_utils/supabase/server";
import GalleryCard from "./galleryCard";

export default async function Gallery() {
  const supabase = createClient();
  const { data: postcards, error } = await supabase.from("postcards").select();

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {postcards?.map((postcard: IPostcard) => (
        <div key={postcard.id} className="break-inside-avoid mb-4">
          <GalleryCard postcard={postcard} />
        </div>
      ))}
    </div>
  );
}
