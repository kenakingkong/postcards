import CardImage from "@/_components/cardImage";
import IPostcard from "@/_lib/postcard/models/postcard";
import ImageUtils from "@/_utils/imageUtils";
import PostcardDisplayUtils from "@/_utils/postcardDisplayUtils";

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
    <CardImage src={src} alt={postcard.template_id} isLandscape={isLandscape} />
  );
}
