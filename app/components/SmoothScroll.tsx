"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Inicializar Lenis para smooth scroll
    const lenis = new Lenis({
      duration: 1.2, // Duración del scroll en segundos
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF loop para actualizar Lenis
    let lastTime = Date.now();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      // Limpiar la instancia al desmontar
      lenis.destroy();
    };
  }, []);

  return null;
}
