import { RefObject, useEffect } from "react";

export default function useOutsideClick(
  ref: RefObject<any>,
  callback: () => any
) {
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);
}
