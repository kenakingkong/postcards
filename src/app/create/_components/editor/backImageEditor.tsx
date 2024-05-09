import { MouseEventHandler, RefObject, useEffect, useState } from "react";
import { useBuilder } from "../builderContext";
import { IAddress } from "@/_lib/templatePicker/template/models/address";
import AddressFormModal from "@/_components/addressFormModal";
import AddressUtils from "@/_utils/addressUtils";
import FormError from "@/_components/formError";
import Canvas from "@/_lib/canvasPainter/canvas";
import CanvasPainter from "@/_lib/canvasPainter";

interface IBackImageEditorProps {
  painterRef: RefObject<CanvasPainter>;
}
export const BackImageEditor: React.FC<IBackImageEditorProps> = ({
  painterRef,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isPromptBoxHovered, setIsPromptBoxHovered] = useState<boolean>(false);
  const [address, setAddress] = useState<IAddress | undefined>();

  const builder = useBuilder();
  const template = builder.template;
  const dimensions = template?.back.dimensions || { w: 0, h: 0 };
  const promptBox = template?.back.customImage || { x: 0, y: 0, w: 0, h: 0 };

  const handleError = () => setHasError(true);

  const updateAddress = (address?: IAddress) => {
    setAddress(address);
    builder.setAddress(address);
  };

  const drawAddress = () => {
    if (!address) return;
    if (!painterRef.current) return;

    const canvas = painterRef.current.getCanvas();
    if (!canvas.context) return;

    canvas.context.fillStyle = Canvas.COLOR_PRIMARY;
    canvas.context.font = "16px sans-serif";
    const offset = 40;
    const x = promptBox.x + offset / 4;
    const y = promptBox.y + offset / 2;

    const addressLines = AddressUtils.formatToLines(address);
    addressLines.forEach((line: string, index: number) => {
      canvas.context?.fillText(line, x, y + index * offset);
    });
  };

  const canvasHandleMouseMove: MouseEventHandler<HTMLCanvasElement> = (
    event
  ) => {
    if (!painterRef.current) return;
    setIsPromptBoxHovered(painterRef.current.isMouseInPromptBox(event));
  };

  const canvasHandleClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!painterRef.current) return;
    setShowForm(painterRef.current.isMouseInPromptBox(event));
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
    if (builder.address) setAddress(builder.address);
  }, [builder]);

  useEffect(() => {
    if (address) return;
    if (!painterRef.current) return;

    if (isPromptBoxHovered) painterRef.current.paintHoveredPromptedBase();
    else painterRef.current.paintPromptedBase();
  }, [isPromptBoxHovered, address]);

  useEffect(() => {
    if (!address) return;
    if (!painterRef.current) return;

    painterRef.current.paintBase();
    drawAddress();
  }, [address]);

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
          src={template.back.backgroundImageUrl}
          width={dimensions.w}
          height={dimensions.h}
        />
      </div>
      {showForm && (
        <AddressFormModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          defaultAddress={address}
          callback={updateAddress}
        />
      )}
      {hasError && <FormError>something went wrong :(</FormError>}
    </div>
  );
};

export default BackImageEditor;
