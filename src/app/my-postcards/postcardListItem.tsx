import CardImage from "@/_components/cardImage";
import IPostcard from "@/_lib/postcard/models/postcard";
import ImageUtils from "@/_utils/imageUtils";
import PostcardDisplayUtils from "@/_utils/postcardDisplayUtils";
import Image from "next/image";
import Link from "next/link";

export default function PostcardListItem({
  index,
  postcard,
}: {
  index: number;
  postcard: IPostcard;
}) {
  const isFrontLandscape = PostcardDisplayUtils.isLandscape(
    postcard.front_image_orientation
  );
  const isBackLandscape = PostcardDisplayUtils.isLandscape(
    postcard.back_image_orientation
  );

  const frontParams = {
    w: isFrontLandscape ? 864 : 576,
    h: isFrontLandscape ? 576 : 864,
    format: "avif",
    quality: 1,
    url: ImageUtils.Supabase.getUrl(postcard.front_image_url),
  };

  const backParams = {
    format: "avif",
    w: isBackLandscape ? 864 : 576,
    h: isBackLandscape ? 576 : 864,
    url: ImageUtils.Supabase.getUrl(postcard.back_image_url),
  };

  const frontImageSrc = ImageUtils.Netlify.getUrl(frontParams);
  const backImageSrc = ImageUtils.Netlify.getUrl(backParams);

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <p className="grow text-2xl">postcard no. {index}</p>
        <Link
          href={`/postcard/${postcard.id}`}
          className="btn-seconary-outline hover:underline"
        >
          download options →
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 items-start justify-center">
        <CardImage
          src={frontImageSrc}
          alt={`${postcard.template_id} - front`}
          isLandscape={isFrontLandscape}
        />
        <CardImage
          src={backImageSrc}
          alt={`${postcard.template_id} - back`}
          isLandscape={isBackLandscape}
        />
      </div>
    </div>
  );
}
