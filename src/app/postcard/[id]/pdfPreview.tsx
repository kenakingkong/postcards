export default function PdfViewer({ pdfSrc }: { pdfSrc: string }) {
  return (
    <div>
      <iframe
        src={pdfSrc}
        height={675}
        width={450}
        className="mx-auto max-w-full"
      />
    </div>
  );
}
