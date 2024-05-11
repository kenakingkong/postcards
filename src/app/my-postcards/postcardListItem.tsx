import IPostcard from "@/_lib/postcard/models/postcard";
import ImageUtils from "@/_utils/imageUtils";
import Link from "next/link";

export default function PostcardListItem({
  index,
  postcard,
}: {
  index: number;
  postcard: IPostcard;
}) {
  const NETLIFY_PARAMS = {
    // w: 576,
    // h: 384,
    format: "avif",
    quality: 1,
  };

  const frontImageSrc = ImageUtils.Netlify.getUrl({
    url: ImageUtils.Supabase.getUrl(postcard.front_image_url),
    ...NETLIFY_PARAMS,
  });

  const backImageSrc = ImageUtils.Netlify.getUrl({
    url: ImageUtils.Supabase.getUrl(postcard.back_image_url),
    ...NETLIFY_PARAMS,
  });

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
      <div className="flex gap-2">
        <img
          src={frontImageSrc}
          alt={`${postcard.template_id} - front`}
          className="bd-secondary"
          width={400}
          height={267}
        />
        <img
          src={backImageSrc}
          alt={`${postcard.template_id} - back`}
          className="bd-secondary"
          width={400}
          height={267}
        />
      </div>
    </div>
  );
}
