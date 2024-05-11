import IPostcard from "@/_lib/postcard/models/postcard";
import { createClient } from "@/_utils/supabase/server";
import GalleryCard from "./galleryCard";

export default async function Gallery() {
  const supabase = createClient();
  const { data: postcards } = await supabase.from("postcards").select();

  return (
    <div className="flex gap-4 flex-wrap items-start">
      {postcards?.map((postcard: IPostcard) => (
        <GalleryCard key={postcard.id} postcard={postcard} />
      ))}
    </div>
  );
}
