import {
  ChangeEventHandler,
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useBuilder } from "../builderContext";
import ImageCropModal from "@/_components/imageCropModal";
import ImageUtils from "@/_utils/imageUtils";
import FormError from "@/_components/formError";
import CanvasPainter from "@/_lib/canvasPainter";

interface IFrontImageEditorProps {
  painterRef: RefObject<CanvasPainter>;
}
export const FrontImageEditor: React.FC<IFrontImageEditorProps> = ({
  painterRef,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isBoxHovered, setIsBoxHovered] = useState<boolean>(false);
  const [cropperImage, setCropperImage] = useState<Blob>();
  const [customImage, setCustomImage] = useState<Blob>();

  const inputRef = useRef<HTMLInputElement>(null);

  const builder = useBuilder();
  const template = builder.template;
  const dimensions = template?.front.dimensions || { w: 0, h: 0 };
  const promptBox = template?.front.customImage || { x: 0, y: 0, w: 0, h: 0 };

  const handleError = () => setHasError(true);

  const canvasDrawCustomImage = () => {
    if (!customImage) return;

    // draw custom image
    createImageBitmap(customImage, { resizeQuality: "high" })
      .then((img) => {
        if (!painterRef.current) return;
        const canvas = painterRef.current.getCanvas();
        canvas.drawImage(img, promptBox);
      })
      .catch(handleError);
  };

  const canvasAddFile = (file?: Blob) => {
    if (file) setCustomImage(file);
    setCropperImage(undefined);
  };

  const canvasHandleMouseMove: MouseEventHandler<HTMLCanvasElement> = (
    event
  ) => {
    if (!painterRef.current) return;
    setIsBoxHovered(painterRef.current.isMouseInPromptBox(event));
  };

  const canvasHandleClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!inputRef.current) return;
    if (!painterRef.current) return;
    if (!painterRef.current.isMouseInPromptBox(event)) return;
    inputRef.current.click();
  };

  const inputHandleFileChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    event.preventDefault();
    if (!event.target?.files?.[0]) return;

    setCropperImage(event.target.files[0]);
  };

  useEffect(() => {
    if (!painterRef.current) return;
    painterRef.current.initialize();
    painterRef.current?.paintBase();

    if (!painterRef.current.bgImageRef.current) return;
    painterRef.current.bgImageRef.current.addEventListener(
      "load",
      () => painterRef.current?.paintPromptedBase(),
      { once: true }
    );
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (!builder.customImageUrl) return;

    ImageUtils.getImageBlobFromUrl(builder.customImageUrl)
      .then((blob) => {
        if (isMounted) setCustomImage(blob);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [builder]);

  useEffect(() => {
    if (!customImage) return;

    if (!painterRef.current) return;
    painterRef.current.paintBase();
    canvasDrawCustomImage();
    builder.setCustomImageUrl(ImageUtils.createImageUrl(customImage));
  }, [customImage]);

  useEffect(() => {
    if (customImage) return;
    if (!painterRef.current) return;

    if (isBoxHovered) painterRef.current.paintHoveredPromptedBase();
    else painterRef.current.paintPromptedBase();
  }, [isBoxHovered, customImage]);

  if (!template) return <></>;

  return (
    <div className="space-y-2">
      <div className="bd-secondary">
        <canvas
          ref={painterRef.current?.canvasRef}
          onMouseMove={canvasHandleMouseMove}
          onClick={canvasHandleClick}
          width={dimensions.w}
          height={dimensions.h}
        ></canvas>
      </div>
      <div className="hidden">
        <img
          ref={painterRef.current?.bgImageRef}
          src={template.front.backgroundImageUrl}
          width={dimensions.w}
          height={dimensions.h}
        />
      </div>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/avif, image/jpeg, image/jpg, image/png, image/svg, image/webp"
        onChange={inputHandleFileChange}
      />
      {cropperImage && (
        <ImageCropModal
          imageFile={cropperImage}
          initialCrop={promptBox}
          callback={canvasAddFile}
        />
      )}
      {hasError && <FormError>something went wrong :(</FormError>}
    </div>
  );
};

export default FrontImageEditor;
