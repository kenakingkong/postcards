"use client";

import downloadItem from "@/_utils/downloadSource";

export default function PdfPrinter({ pdfSrc }: { pdfSrc: string }) {
  const handleDownload = () => downloadItem(pdfSrc, "postcard_pdf.webp");

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-xl">print & cut</p>
      <p>
        print this pdf front-to-back on matte white cardstock and cut along the
        edges <br /> tip: for the best results, try a borderless layout or small
        page margins
      </p>
      <button className="btn-primary max-w-xs" onClick={handleDownload}>
        download pdf
      </button>
    </div>
  );
}
