"use client";

import { useEffect, useRef } from "react";
import "./efficiency-meter.css";

export function EfficiencyMeter({ value }: { value: number }) {
  const meter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = meter.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div className="jx-efficiency-meter" ref={meter} aria-hidden="true">
    <span style={{ width: `${value}%` }} />
  </div>;
}
