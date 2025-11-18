"use client";

import CardImage from "@/_components/cardImage";
import ImageUtils from "@/_utils/imageUtils";
import PostcardDisplayUtils from "@/_utils/postcardDisplayUtils";

interface IPostcardPreviewImageProps {
  src: string;
  alt: string;
  isLandscape: boolean;
}

export default function PostcardPreviewImage({
  src,
  alt,
  isLandscape,
}: IPostcardPreviewImageProps) {
  const dimensions = PostcardDisplayUtils.getPreviewDimensions(isLandscape);

  const imgSrc = ImageUtils.Netlify.getUrl({
    url: src,
    format: "avif",
    w: dimensions.width * 2,
  });

  return (
    <div className="flex items-center justify-center w-[180px] h-[120px]">
      <CardImage
        src={imgSrc}
        alt={alt}
        className={
          isLandscape
            ? `w-[${dimensions.width}px] h-[${dimensions.height}px]`
            : `-rotate-90 w-[${dimensions.width}px] h-[${dimensions.height}px]`
        }
        width={dimensions.width}
        height={dimensions.height}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      />
    </div>
  );
}
