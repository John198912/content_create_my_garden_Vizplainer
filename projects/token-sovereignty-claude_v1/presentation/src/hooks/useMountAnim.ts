import { useState, useEffect } from "react";

/**
 * Delays the `.in` class until the next animation frame after mount/step-change,
 * preventing CSS transition-on-mount from being skipped by the browser.
 */
export function useMountAnim(step: number): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(false);
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, [step]);
  return mounted;
}
