import { useState, useLayoutEffect } from "react";

export default function useMeasure(ref) {
  const [bounds, setContentRect] = useState(
    // DOMRectReadOnly.fromRect()
    { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 }
  );

  useLayoutEffect(() => {
    let animationFrameId = null;
    const measure = ([entry]) => {
      animationFrameId = window.requestAnimationFrame(() => {
        setContentRect(ref.current.getBoundingClientRect());
      });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      ro.disconnect();
    };
  }, []);

  return bounds;
}
