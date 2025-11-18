"use client";

import IPostcard from "@/_lib/postcard/models/postcard";
import downloadItem from "@/_utils/downloadSource";
import ImageUtils from "@/_utils/imageUtils";
import Section from "./section";

export default function PdfPreview({ postcard }: { postcard: IPostcard }) {
  const pdfSrc = ImageUtils.Supabase.getUrl(postcard?.pdf_url);

  const handleDownload = () => downloadItem(pdfSrc, "postcard_pdf.webp");

  return (
    <Section>
      <Section.Aside>
        <Section.AsideContent>
          <Section.SuperTitle>OPTION 2</Section.SuperTitle>
          <Section.Title>print & cut pdf</Section.Title>
          <Section.Subtitle>
            print front-to-back on matte white cardstock and cut along
            the edges
          </Section.Subtitle>
          <Section.Subtitle>
            tip: for the best results, try a borderless layout or small page
            margins
          </Section.Subtitle>
        </Section.AsideContent>
        <button className="btn-primary max-w-60" onClick={handleDownload}>
          download pdf
        </button>
      </Section.Aside>
      <Section.Content>
        <div className="col-span-2 flex gap-2 items-center justify-end">
          <iframe
            src={`${pdfSrc}#view=fit`}
            width={300}
            height={400}
            loading="lazy"
          />
        </div>
      </Section.Content>
    </Section>
  );
}
