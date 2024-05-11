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
    // w: isFrontLandscape ? 576 : 384,
    // h: isFrontLandscape ? 384 : 576,
    format: "avif",
    quality: 1,
    url: ImageUtils.Supabase.getUrl(postcard.front_image_url),
  };

  const backParams = {
    // w: isBackLandscape ? 576 : 384,
    // h: isBackLandscape ? 384 : 576,
    format: "avif",
    quality: 1,
    url: ImageUtils.Supabase.getUrl(postcard.back_image_url),
  };

  const frontImageSrc = ImageUtils.Netlify.getUrl(frontParams);
  const backImageSrc = ImageUtils.Netlify.getUrl(backParams);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-between items-end">
        <p className="grow text-2xl">postcard no. {index}</p>
        <Link
          href={`/postcard/${postcard.id}`}
          className="btn-seconary-outline"
        >
          download options →
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 items-start">
        <Image
          src={frontImageSrc}
          alt={`${postcard.template_id} - front`}
          className="bd-secondary w-auto h-auto max-w-[90svw] md:max-w-[460px] max-h-[90svw] md:max-h-[460px]"
          width={isFrontLandscape ? 460 : 307}
          height={isFrontLandscape ? 307 : 460}
        />
        <Image
          src={backImageSrc}
          alt={`${postcard.template_id} - back`}
          className="bd-secondary w-auto h-auto max-w-[90svw] md:max-w-[460px] max-h-[90svw] md:max-h-[460px]"
          width={isFrontLandscape ? 460 : 307}
          height={isFrontLandscape ? 307 : 460}
        />
      </div>
    </div>
  );
}
