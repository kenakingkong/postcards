import IPostcard from "@/_lib/postcard/models/postcard";
import PostcardPreview from "./postcardPreview";
import PostcardPrinter from "./postcardPrinter";
import PdfPrinter from "./pdfPrinter";
import PdfViewer from "./pdfPreview";
import ImageUtils from "@/_utils/imageUtils";

export default function Preview({ postcard }: { postcard: IPostcard }) {
  const frontImageSrc = ImageUtils.Supabase.getUrl(postcard?.front_image_url);
  const backImageSrc = ImageUtils.Supabase.getUrl(postcard?.back_image_url);
  const pdfSrc = ImageUtils.Supabase.getUrl(postcard?.pdf_url);

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
