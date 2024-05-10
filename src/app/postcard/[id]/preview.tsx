import SupabaseUtils from "@/_utils/supabase";
import IPostcard from "@/_lib/postcard/models/postcard";
import PostcardPreview from "./postcardPreview";
import PostcardPrinter from "./postcardPrinter";
import PdfPrinter from "./pdfPrinter";
import PdfViewer from "./pdfPreview";

export default function Preview({ postcard }: { postcard: IPostcard }) {
  const frontImageSrc = SupabaseUtils.getLiveUrl(postcard?.front_image_url);
  const backImageSrc = SupabaseUtils.getLiveUrl(postcard?.back_image_url);
  const pdfSrc = SupabaseUtils.getLiveUrl(postcard?.pdf_url);

  return (
    <>
      <PostcardPreview
        frontImageSrc={frontImageSrc}
        backImageSrc={backImageSrc}
      />
      <div className="text-center text-9xl">˯</div>
      <p className="text-3xl text-center">next steps: print!</p>
      <PostcardPrinter
        frontImageSrc={frontImageSrc}
        backImageSrc={backImageSrc}
      />
      <div className="text-center"> - or - </div>
      <PdfPrinter pdfSrc={pdfSrc} />
      <PdfViewer pdfSrc={pdfSrc} />
    </>
  );
}
