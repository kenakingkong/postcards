"use client";

import IPostcard from "@/_lib/postcard/models/postcard";
import downloadItem from "@/_utils/downloadSource";
import ImageUtils from "@/_utils/imageUtils";

export default function PdfPreview({ postcard }: { postcard: IPostcard }) {
  const pdfSrc = ImageUtils.Supabase.getUrl(postcard?.pdf_url);

  const handleDownload = () => downloadItem(pdfSrc, "postcard_pdf.webp");

  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
      <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
        <p className="text-xl">print & cut pdf</p>
        <p>
          print this pdf front-to-back on matte white cardstock and cut along
          the edges <br />
          <br /> tip: for the best results, try a borderless layout or small
          page margins
        </p>
        <button className="btn-primary max-w-60" onClick={handleDownload}>
          download pdf
        </button>
      </div>
      <iframe
        src={pdfSrc}
        height={675}
        width={450}
        className="mx-auto max-w-full"
        loading="lazy"
      />
    </div>
  );
}
