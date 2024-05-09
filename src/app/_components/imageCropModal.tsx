"use client";

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Modal from "./modal";
import FormError from "./formError";
import ImageUtils from "@/_utils/imageUtils";
import { ICustomImage } from "@/_lib/templatePicker/template/models/customImage";
import Cropper from "cropperjs";

import "cropperjs/dist/cropper.css";

interface IImageCropModalProps {
  imageFile: Blob;
  initialCrop?: ICustomImage;
  callback: (file?: Blob) => any;
}

const ImageCropModal: React.FC<IImageCropModalProps> = ({
  imageFile,
  initialCrop,
  callback,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isShowing, setIsShowing] = useState<boolean>(!!imageFile);
  const [imageSrc, setImageSrc] = useState<string | undefined>(
    ImageUtils.createImageUrl(imageFile)
  );

  const imageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper>();

  const handleDone: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!cropperRef.current) return;

    cropperRef.current.getCroppedCanvas().toBlob(
      (blob) => {
        if (blob) {
          callback(blob);
        } else {
          setHasError(true);
        }
      },
      "image/webp",
      1
    );
  };

  const handleClose = () => {
    callback(undefined);
  };

  useEffect(() => {
    if (imageFile) {
      setImageSrc(ImageUtils.createImageUrl(imageFile));
    }
    if (imageFile && imageRef.current && !cropperRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        viewMode: 1,
        zoomable: false,
        zoomOnTouch: false,
        zoomOnWheel: false,
        toggleDragModeOnDblclick: false,
        aspectRatio: !!initialCrop ? initialCrop.w / initialCrop.h : NaN,
        autoCropArea: 1,
      });
      setIsShowing(true);
    }
  }, [imageFile]);

  return (
    <Modal isOpen={isShowing} onClose={handleClose}>
      <div className="p-4 space-y-4">
        <div className="max-w-[500px] max-h-[500px]">
          <img ref={imageRef} src={imageSrc} className="max-w-full" />
        </div>
        <div className="w-full flex justify-center">
          <button className="btn-primary" onClick={handleDone}>
            done!
          </button>
        </div>
        {hasError && <FormError>something went wrong :(</FormError>}
      </div>
    </Modal>
  );
};

export default ImageCropModal;
