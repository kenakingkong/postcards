import IPostcard from "@/_lib/postcard/models/postcard";
import ImageUtils from "@/_utils/imageUtils";
import { createClient } from "@/_utils/supabase/server";

export default async function Gallery() {
  const supabase = createClient();
  const { data: postcards } = await supabase.from("postcards").select();

  return (
    <div className="flex gap-2">
      {postcards?.map((postcard: IPostcard) => (
        <div
          key={postcard.id}
          className="bd-secondary hover:bd-primary w-max h-max"
        >
          <img
            key={postcard.id}
            src={ImageUtils.Supabase.getUrl(postcard.front_image_url)}
            alt={postcard.template_id}
            className="max-w-[500px] max-h-[500px]"
          />
        </div>
      ))}
    </div>
  );
}
