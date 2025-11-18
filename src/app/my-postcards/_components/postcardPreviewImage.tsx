import CardImage from "@/_components/cardImage";
import ImageUtils from "@/_utils/imageUtils";
import PostcardDisplayUtils from "@/_utils/postcardDisplayUtils";

export default function PostcardPreviewImage({
  src,
  alt,
  isLandscape,
}: {
  src: string;
  alt: string;
  isLandscape: boolean;
}) {
  const dimensions = PostcardDisplayUtils.getThumbnailDimensions(isLandscape);

  const imgSrc = ImageUtils.Netlify.getUrl({
    url: ImageUtils.Supabase.getUrl(src),
    format: "avif",
    w: dimensions.width * 2,
  });

  return (
    <CardImage
      src={imgSrc}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className="w-auto h-auto"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
    />
  );
}
