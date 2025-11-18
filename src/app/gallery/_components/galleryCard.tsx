import CardImage from "@/_components/cardImage";
import IPostcard from "@/_lib/postcard/models/postcard";
import ImageUtils from "@/_utils/imageUtils";
import PostcardDisplayUtils from "@/_utils/postcardDisplayUtils";

export default function GalleryCard({ postcard }: { postcard: IPostcard }) {
  const isLandscape = PostcardDisplayUtils.isLandscape(
    postcard.front_image_orientation
  );

  const dimensions = PostcardDisplayUtils.getGalleryDimensions(isLandscape);

  const src = ImageUtils.Netlify.getUrl({
    url: ImageUtils.Supabase.getUrl(postcard.front_image_url),
    format: "avif",
    w: dimensions.width * 2,
  });

  return (
    <CardImage
      src={src}
      alt={`postcard ${postcard.id}`}
      width={dimensions.width}
      height={dimensions.height}
      className="w-full h-auto"
    />
  );
}
