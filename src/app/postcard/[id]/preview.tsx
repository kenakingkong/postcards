"use client";

import IPostcard from "@/_lib/postcard/models/postcard";
import PostcardPreview from "./postcardPreview";
import PdfPreview from "./pdfPreview";
import ImageUtils from "@/_utils/imageUtils";

export default function Preview({ postcard }: { postcard: IPostcard }) {
  const frontImageSrc = ImageUtils.Supabase.getUrl(postcard?.front_image_url);
  const backImageSrc = ImageUtils.Supabase.getUrl(postcard?.back_image_url);
  const pdfSrc = ImageUtils.Supabase.getUrl(postcard?.pdf_url);

  return (
    <div className="max-w-4xl mx-auto space-y-8 lg:space-y-16">
      <PostcardPreview
        frontImageSrc={frontImageSrc}
        backImageSrc={backImageSrc}
      />
      <PdfPreview pdfSrc={pdfSrc} />
    </div>
  );
}
