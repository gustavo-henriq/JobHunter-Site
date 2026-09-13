"use client";

import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-flow]"),
    );

    root.classList.add("motion-ready");

    if (reduceMotion) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return () => root.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          const delay = Number(node.dataset.revealDelay ?? 0);
          node.style.setProperty("--reveal-delay", `${delay}ms`);
          node.classList.add("is-visible");
          observer.unobserve(node);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    revealNodes.forEach((node) => observer.observe(node));

    const tiltCard = document.querySelector<HTMLElement>("[data-tilt]");
    const handlePointerMove = (event: PointerEvent) => {
      if (!tiltCard || event.pointerType === "touch") return;
      const rect = tiltCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tiltCard.style.setProperty("--tilt-x", `${x * 4}deg`);
      tiltCard.style.setProperty("--tilt-y", `${y * -4}deg`);
    };
    const resetTilt = () => {
      tiltCard?.style.setProperty("--tilt-x", "0deg");
      tiltCard?.style.setProperty("--tilt-y", "0deg");
    };

    tiltCard?.addEventListener("pointermove", handlePointerMove);
    tiltCard?.addEventListener("pointerleave", resetTilt);

    return () => {
      observer.disconnect();
      tiltCard?.removeEventListener("pointermove", handlePointerMove);
      tiltCard?.removeEventListener("pointerleave", resetTilt);
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
