import { EffectCallback, useEffect, useRef } from "react";

export default function useOnMountUnsafe(callback: EffectCallback) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;
    callback();
  }, []);
}
