import { Postcard } from "@/_lib/postcardBuilder/postcard";
import { useBuilder } from "../builderContext";
import { useEffect, useRef } from "react";

interface IImagesPreviewProps {}

const Previews: React.FC<IImagesPreviewProps> = ({}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const frontImageRef = useRef<HTMLImageElement>(null);
  const backImageRef = useRef<HTMLImageElement>(null);

  const builder = useBuilder();

  const downloadItem = (href: string, filename: string) => {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadImages = () => {
    if (!frontImageRef.current || !backImageRef.current) return;

    downloadItem(frontImageRef.current.src, "postcard_front.png");
    downloadItem(backImageRef.current.src, "postcard_back.png");
  };

  const handleDownloadPdf = () => {
    if (!iframeRef.current) return;

    downloadItem(iframeRef.current.src, "postcard.pdf");
  };

  useEffect(() => {
    if (
      !builder ||
      !iframeRef.current ||
      !frontImageRef.current ||
      !backImageRef.current
    )
      return;

    const frontImageUrl = builder.getUrl(Postcard.FRONT_IMG_URL);
    if (frontImageUrl) frontImageRef.current.setAttribute("src", frontImageUrl);

    const backImageUrl = builder.getUrl(Postcard.BACK_IMG_URL);
    if (backImageUrl) backImageRef.current.setAttribute("src", backImageUrl);

    const pdfUrl = builder.getUrl(Postcard.PDF_URL);
    if (pdfUrl) iframeRef.current.setAttribute("src", pdfUrl);
  }, [builder]);

  return (
    <>
      <div className="py-4 md:py-6 lg:py-10 space-y-4 lg:space-y-6">
        <div className="flex gap-2 flex-wrap items-start justify-center">
          <div className="bd-secondary">
            <img
              ref={frontImageRef}
              src=""
              alt="front of postcard"
              className="w-full h-full max-w-[500px] max-h-[500px]"
            />
          </div>
          <div className="bd-secondary">
            <img
              ref={backImageRef}
              src=""
              alt="back of postcard"
              className="w-full h-full max-w-[500px] max-h-[500px]"
            />
          </div>
        </div>
        <div className="text-center">
          <p>share your creation (just the front!)</p>
          <p>linkedin facebook</p>
        </div>
      </div>

      <div className="text-center text-9xl">˯</div>
      <p className="text-3xl text-center">next steps: print!</p>
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-xl">print to size</p>
        <p>
          print these images front-to-back on matte white 4x6 postcard paper
        </p>
        <button className="btn-primary max-w-xs" onClick={handleDownloadImages}>
          download images
        </button>
      </div>
      <div className="text-center"> - or - </div>
      <div className="flex flex-col items-center gap-4 text-center ">
        <p className="text-xl">print & cut</p>
        <p>
          print this pdf front-to-back on matte white cardstock and cut along
          the edges <br /> tip: for the best results, try a borderless layout or
          small page margins
        </p>
        <button className="btn-primary max-w-xs" onClick={handleDownloadPdf}>
          download pdf
        </button>
      </div>
      <div>
        <iframe
          ref={iframeRef}
          src=""
          height={675}
          width={450}
          className="mx-auto max-w-full"
        />
      </div>
    </>
  );
};

export default Previews;
