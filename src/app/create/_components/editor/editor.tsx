import { useRef, useState } from "react";
import FormError from "@/_components/formError";
import BackImageEditor from "./backImageEditor";
import FrontImageEditor from "./frontImageEditor";
import { useBuilder } from "../builderContext";
import { useSteps } from "../stepsContext";
import CanvasPainter from "@/_lib/canvasPainter";
import ImageUtils from "@/_utils/imageUtils";
import Pdf from "@/_lib/pdfBuilder";
import { Postcard } from "@/_lib/postcardBuilder/postcard";

export default function ImageEditors() {
  const builder = useBuilder();
  const { setActiveStep } = useSteps();

  const [hasError, setHasError] = useState<boolean>(false);

  const FRONT_PROMPT = "+ add image";
  const BACK_PROMPT = "+ add an address";

  const template = builder.template;

  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontBgImageRef = useRef<HTMLImageElement>(null);
  const frontPainterRef = useRef<CanvasPainter>(
    new CanvasPainter(
      frontCanvasRef,
      frontBgImageRef,
      FRONT_PROMPT,
      template?.front.customImage,
      template?.front.dimensions
    )
  );

  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const backBgImageRef = useRef<HTMLImageElement>(null);
  const backPainterRef = useRef<CanvasPainter>(
    new CanvasPainter(
      backCanvasRef,
      backBgImageRef,
      BACK_PROMPT,
      template?.back.customImage,
      template?.back.dimensions
    )
  );

  const generatePdf = () => {
    if (!frontCanvasRef.current || !backCanvasRef.current) return;
    const shouldRotate = template?.front.orientation == "portrait";
    return new Pdf().build(
      frontCanvasRef.current,
      backCanvasRef.current,
      shouldRotate
    );
  };

  const onGenerate = async () => {
    if (!builder.hasCustomImageUrl()) {
      setHasError(true);
      return;
    }
    
    if (!builder.hasAddress()) {
      // remove address box
      backPainterRef.current.paintBase();
    }

    await Promise.all([
      frontPainterRef.current.saveCanvasAsBlob(),
      backPainterRef.current.saveCanvasAsBlob(),
    ])
      .then((values) => {
        builder.setUrl(
          Postcard.FRONT_IMG_URL,
          ImageUtils.createImageUrl(values[0])
        );
        builder.setUrl(
          Postcard.BACK_IMG_URL,
          ImageUtils.createImageUrl(values[1])
        );

        const pdfUrl = generatePdf();
        if (pdfUrl) builder.setUrl(Postcard.PDF_URL, pdfUrl);

        setActiveStep("step-print");
      })
      .catch(() => {
        console.log("did someone throw and error?");
        setHasError(true);
      });
  };

  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center">
        <FrontImageEditor painterRef={frontPainterRef} />
        <BackImageEditor painterRef={backPainterRef} />
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 space-y-2 flex flex-col items-center">
        {hasError && <FormError>upload a custom image to continue</FormError>}
        <button className="btn-primary" onClick={onGenerate}>
          generate postcard
        </button>
      </div>
    </>
  );
}
