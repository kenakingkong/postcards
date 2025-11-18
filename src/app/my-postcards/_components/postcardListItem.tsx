import IPostcard from "@/_lib/postcard/models/postcard";
import PostcardDisplayUtils from "@/_utils/postcardDisplayUtils";
import Dropdown from "./dropdown";
import PostcardPreviewImage from "./postcardPreviewImage";

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

  return (
    <div className="p-4 md:px-6 min-h-[180px] bg-secondary rounded flex flex-col md:flex-row md:items-center gap-2">
      <div className="grow">
        <p className="text-2xl">postcard #{postcard.id} </p>
        <p className="text-sm">Created {String(postcard.created_at)}</p>
        <div>
          Print Instructions
          <Dropdown postcard={postcard} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <PostcardPreviewImage
          src={postcard.front_image_url}
          alt={`${postcard.template_id} - front`}
          isLandscape={isFrontLandscape}
        />
        <PostcardPreviewImage
          src={postcard.back_image_url}
          alt={`${postcard.template_id} - back`}
          isLandscape={isBackLandscape}
        />
      </div>
    </div>
  );
}
