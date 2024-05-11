"use client";

import downloadItem from "@/_utils/downloadSource";
import ImageUtils from "@/_utils/imageUtils";
import { useRef } from "react";

export default function PostcardPreview({
  frontImageSrc,
  backImageSrc,
}: {
  frontImageSrc: string;
  backImageSrc: string;
}) {
  const frontImgRef = useRef<HTMLImageElement>(null);
  const backImgRef = useRef<HTMLImageElement>(null);

  const handleWebpDownload = () => {
    downloadItem(frontImageSrc, "postcard_front.webp");
    downloadItem(backImageSrc, "postcard_back.webp");
  };

  const handleJpegDownload = () => {
    const w = frontImgRef.current ? frontImgRef.current.naturalWidth : 1152;
    const h = frontImgRef.current ? frontImgRef.current.naturalHeight : 768;

    const NETLIFY_PARAMS = {
      w: w,
      h: h,
      quality: 1,
      format: "jpeg",
    };

    const frontJpegUrl = ImageUtils.Netlify.getUrl({
      url: frontImageSrc,
      ...NETLIFY_PARAMS,
    });
    const backJpegUrl = ImageUtils.Netlify.getUrl({
      url: backImageSrc,
      ...NETLIFY_PARAMS,
    });

    downloadItem(frontJpegUrl, "postcard_front.jpeg");
    downloadItem(backJpegUrl, "postcard_back.jpeg");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
      <div className="flex flex-col gap-2 items-center lg:items-end">
        <div className="bd-secondary w-max h-max">
          <img
            ref={frontImgRef}
            src={frontImageSrc}
            alt="front of postcard"
            className="w-auto h-auto max-w-[400px] max-h-[400px]"
          />
        </div>
        <div className="bd-secondary w-max h-max">
          <img
            ref={backImgRef}
            src={backImageSrc}
            alt="back of postcard"
            className="w-auto h-auto max-w-[400px] max-h-[400px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
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
