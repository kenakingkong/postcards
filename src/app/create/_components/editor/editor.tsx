"use client";

import { useRef, useState } from "react";
import FormError from "@/_components/formError";
import BackImageEditor from "./backImageEditor";
import FrontImageEditor from "./frontImageEditor";
import { useBuilder } from "../builderContext";
import CanvasPainter from "@/_lib/canvasPainter";
import Pdf from "@/_lib/pdfBuilder";
import { createClient } from "@/_utils/supabase/client";
import { useRouter } from "next/navigation";
import classNames from "classnames";

export default function ImageEditors() {
  const router = useRouter();
  const supabase = createClient();
  const builder = useBuilder();

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
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
    if (!frontCanvasRef.current || !backCanvasRef.current) {
      return new Blob();
    }
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

    try {
      setIsGenerating(true);

      const imageBlobs = await Promise.all([
        frontPainterRef.current.saveCanvasAsBlob(),
        backPainterRef.current.saveCanvasAsBlob(),
      ]);

      const pdfBlob = generatePdf();

      const { data: userData, error } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      const { data: frontImageData, error: frontImageError } =
        await supabase.storage
          .from("postcard-uploads")
          .upload(
            `${userId}/${builder.generateFileName("front", ".webp")}`,
            imageBlobs[0]
          );

      if (frontImageError) {
        console.error(frontImageError);
        throw new Error();
      }

      const { data: backImageData, error: backImageError } =
        await supabase.storage
          .from("postcard-uploads")
          .upload(
            `${userId}/${builder.generateFileName("back", ".webp")}`,
            imageBlobs[1]
          );

      if (backImageError) throw new Error();

      const { data: pdfData, error: pdfError } = await supabase.storage
        .from("postcard-uploads")
        .upload(
          `${userId}/${builder.generateFileName("pdf", ".pdf")}`,
          pdfBlob
        );

      if (pdfError) throw new Error();

      const payload = {
        user_id: userId,
        template_id: builder.template?.id,
        front_image_url: frontImageData?.path || "",
        back_image_url: backImageData?.path || "",
        pdf_url: pdfData?.path || "",
      };

      const { data: record, error: recordError } = await supabase
        .from("postcards")
        .insert(payload)
        .select();

      if (recordError) throw new Error();

      setIsGenerating(false);

      router.push(`/postcard/${record?.[0]?.id}`);
    } catch (error) {
      console.error("did someone throw and error?");
      setHasError(true);
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 flex-wrap justify-center">
        <FrontImageEditor painterRef={frontPainterRef} />
        <BackImageEditor painterRef={backPainterRef} />
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 space-y-2 flex flex-col items-center">
        {hasError && <FormError>upload a custom image to continue</FormError>}
        <button
          className={classNames("btn-primary", isGenerating && "cursor-wait")}
          onClick={onGenerate}
        >
          {isGenerating ? "generating..." : "generate postcard"}
        </button>
      </div>
    </>
  );
}
