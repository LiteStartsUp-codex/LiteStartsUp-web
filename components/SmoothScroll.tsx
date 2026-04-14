"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Inicializar Lenis para smooth scroll
    const lenis = new Lenis({
      duration: 1.2, // Duración del scroll en segundos
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function suave
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF loop para actualizar Lenis continuamente
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Handle anchor links for smooth scroll
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const hash = target.getAttribute("href");
        const element = document.querySelector(hash!);
        if (element) {
          lenis.scrollTo(element as HTMLElement);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      // Limpiar la instancia al desmontar el componente
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
