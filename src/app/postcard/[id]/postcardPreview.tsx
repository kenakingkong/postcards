"use client";

import IPostcard from "@/_lib/postcard/models/postcard";
import downloadItem from "@/_utils/downloadSource";
import ImageUtils from "@/_utils/imageUtils";
import PostcardDisplayUtils from "@/_utils/postcardDisplayUtils";
import Image from "next/image";

export default function PostcardPreview({ postcard }: { postcard: IPostcard }) {
  const isFrontLandscape = PostcardDisplayUtils.isLandscape(
    postcard.front_image_orientation
  );
  const isBackLandscape = PostcardDisplayUtils.isLandscape(
    postcard.back_image_orientation
  );
  const frontImageSrc = ImageUtils.Supabase.getUrl(postcard?.front_image_url);
  const backImageSrc = ImageUtils.Supabase.getUrl(postcard?.back_image_url);

  const handleWebpDownload = () => {
    downloadItem(frontImageSrc, "postcard_front.webp");
    downloadItem(backImageSrc, "postcard_back.webp");
  };

  const handleJpegDownload = () => {
    const frontParams = {
      w: isFrontLandscape ? 1152 : 762,
      h: isFrontLandscape ? 762 : 1152,
      quality: 1,
      format: "jpeg",
      url: frontImageSrc,
    };

    const backparams = {
      w: isBackLandscape ? 1152 : 762,
      h: isBackLandscape ? 762 : 1152,
      quality: 1,
      format: "jpeg",
      url: backImageSrc,
    };

    const frontJpegUrl = ImageUtils.Netlify.getUrl(frontParams);
    const backJpegUrl = ImageUtils.Netlify.getUrl(backparams);

    downloadItem(frontJpegUrl, "postcard_front.jpeg");
    downloadItem(backJpegUrl, "postcard_back.jpeg");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
      <div className="flex flex-col gap-2 items-center lg:items-end">
        <div className="bd-secondary w-max h-max">
          <Image
            src={frontImageSrc}
            alt="front of postcard"
            className="w-auto h-auto max-w-[90svw] md:max-w-[460px] max-h-[90svw] md:max-h-[460px]"
            width={isFrontLandscape ? 460 : 307}
            height={isFrontLandscape ? 307 : 460}
          />
        </div>
        <div className="bd-secondary w-max h-max">
          <Image
            src={backImageSrc}
            alt="back of postcard"
            className="w-auto h-auto max-w-[90svw] md:max-w-[460px] max-h-[90svw] md:max-h-[460px]"
            width={isBackLandscape ? 460 : 307}
            height={isBackLandscape ? 307 : 460}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
        <p className="text-xl">print images</p>
        <p>
          print these images front-to-back on matte white 4x6 postcard paper
        </p>
        <button className="btn-primary max-w-60" onClick={handleWebpDownload}>
          download webp
        </button>
        <button
          className="btn-primary-outline max-w-60"
          onClick={handleJpegDownload}
        >
          download jpeg
        </button>
      </div>
    </div>
  );
}
