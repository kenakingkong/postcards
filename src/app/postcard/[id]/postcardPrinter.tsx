"use client";

import downloadItem from "@/_utils/downloadSource";

export default function PostcardPrinter({
  frontImageSrc,
  backImageSrc,
}: {
  frontImageSrc: string;
  backImageSrc: string;
}) {
  const handleDownload = () => {
    downloadItem(frontImageSrc, "postcard_front.webp");
    downloadItem(backImageSrc, "postcard_back.webp");
  };

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-xl">print to size</p>
      <p>print these images front-to-back on matte white 4x6 postcard paper</p>
      <button className="btn-primary max-w-xs" onClick={handleDownload}>
        download images
      </button>
    </div>
  );
}
