import useOutsideClick from "@/_hooks/useOutsideClick";
import {
  KeyboardEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {
  const wrapperEl = document.getElementById("app-modal");

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(isOpen);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    onClose?.();
    setIsDialogOpen(false);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDialogElement> = (event) => {
    if (event.key == "Escape") handleClose();
  };

  useOutsideClick(containerRef, handleClose);

  useEffect(() => {
    setIsDialogOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;

    if (isDialogOpen) dialogEl.showModal();
    else dialogEl.close();
  }, [isDialogOpen]);

  if (!wrapperEl) return null;
  return ReactDOM.createPortal(
    <dialog ref={dialogRef} onKeyDown={handleKeyDown} className="relative z-10">
      <div className="fixed z-10 top-0 left-0 w-full h-full modal-overlay"></div>
      <div className="fixed z-20 top-0 left-0 w-full h-full flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative max-w-[95%] max-h-[95%] overflow-scroll bg-white p-5"
        >
          <button
            title="close dialog"
            className="absolute top-1.5 right-2"
            onClick={() => handleClose()}
          >
            ⓧ
          </button>
          {children}
        </div>
      </div>
    </dialog>,
    wrapperEl
  );
};

export default Modal;
