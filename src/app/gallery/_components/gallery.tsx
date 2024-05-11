import IPostcard from "@/_lib/postcard/models/postcard";
import ImageUtils from "@/_utils/imageUtils";
import { createClient } from "@/_utils/supabase/server";

export default async function Gallery() {
  const supabase = createClient();
  const { data: postcards } = await supabase.from("postcards").select();

  return (
    <div className="flex gap-4 flex-wrap items-start">
      {postcards?.map((postcard: IPostcard) => (
        <img
          key={postcard.id}
          src={ImageUtils.Netlify.getUrl({
            url: ImageUtils.Supabase.getUrl(postcard.front_image_url),
            format: "avif",
          })}
          alt={postcard.template_id}
          className="bd-secondary max-w-[375px] max-h-[375px]"
        />
      ))}
    </div>
  );
}
