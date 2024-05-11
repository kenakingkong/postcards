import IPostcard from "@/_lib/postcard/models/postcard";
import ImageUtils from "@/_utils/imageUtils";
import PostcardDisplayUtils from "@/_utils/postcardDisplayUtils";
import Image from "next/image";

export default function GalleryCard({ postcard }: { postcard: IPostcard }) {
  const isLandscape = PostcardDisplayUtils.isLandscape(
    postcard.front_image_orientation
  );

  const src = ImageUtils.Netlify.getUrl({
    url: ImageUtils.Supabase.getUrl(postcard.front_image_url),
    format: "avif",
    w: isLandscape ? 864 : 576,
    h: isLandscape ? 576 : 864,
  });

  return (
    <Image
      key={postcard.id}
      src={src}
      alt={postcard.template_id}
      className="bd-secondary max-w-[90svw] md:max-w-[374px] max-h-[90svw] md:max-h-[374px]"
      loading="lazy"
      width={isLandscape ? 374 : 249.6}
      height={isLandscape ? 249.6 : 374}
    />
  );
}
