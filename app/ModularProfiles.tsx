"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const layers = [
  { number: "01", label: "Perfil", value: "Marketing", status: "configurado", start: -0.18, rotate: -2.8 },
  { number: "02", label: "Competências", value: "Conteúdo · SEO · CRM", status: "configurado", start: 0.14, rotate: 1.8 },
  { number: "03", label: "Busca", value: "São Paulo · Híbrido · Júnior", status: "aplicado", start: 0.4, rotate: 3.1 },
  { number: "04", label: "Resultado", value: "Analista de Marketing Jr.", status: "ranqueado", match: "94% compatível", start: 0.6, rotate: 4.6 },
];

const stages = ["Identidade", "Estratégia", "Oportunidades"];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function eased(value: number) {
  return 1 - Math.pow(1 - clamp(value), 3);
}

function revealStyle(progress: number, start: number, end: number): CSSProperties {
  const amount = eased((progress - start) / (end - start));
  return {
    opacity: 0.08 + amount * 0.92,
    filter: `blur(${(1 - amount) * 9}px)`,
    transform: `translateY(${(1 - amount) * 18}px)`,
  };
}

export function ModularProfiles() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(clamp(-rect.top / travel));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const visualProgress = clamp(progress / 0.88);
  const activeStage = visualProgress < 0.27 ? 0 : visualProgress < 0.64 ? 1 : 2;

  const jumpToStage = (stage: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    const targets = [0.08, 0.46, 0.82];
    window.scrollTo({ top: section.offsetTop + travel * targets[stage], behavior: "smooth" });
  };

  return (
    <section className="scroll-dive" id="perfis" ref={sectionRef} aria-label="Perfis modulares do JobHunter">
      <div className="scroll-sticky">
        <div className="scroll-dive-shell">
          <div className="profile-story">
            <span className="kicker">PERFIS MODULARES</span>
            <h2>
              <span style={revealStyle(visualProgress, -0.12, 0.02)}>Suas metas</span>
              <span style={revealStyle(visualProgress, -0.04, 0.12)}>mudam. O JobHunter</span>
              <em style={revealStyle(visualProgress, 0.05, 0.22)}>acompanha.</em>
            </h2>
            <p style={revealStyle(visualProgress, 0.16, 0.34)}>
              Cada perfil combina currículo, critérios e fontes sem misturar seus objetivos.
            </p>

            <div className="profile-steps" aria-label="Etapas da configuração modular">
              {stages.map((stage, index) => (
                <button
                  className={index === activeStage ? "is-active" : ""}
                  type="button"
                  onClick={() => jumpToStage(index)}
                  aria-current={index === activeStage ? "step" : undefined}
                  key={stage}
                >
                  <span>0{index + 1}</span>
                  <strong>{stage}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="profile-stack-column" aria-live="polite">
            <div className="profile-stack-stage">
              <div
                className="stack-connector"
                aria-hidden="true"
                style={{ transform: `scaleY(${clamp((visualProgress - 0.05) / 0.74)})` }}
              />

              {layers.map((layer, index) => {
                const amount = eased((visualProgress - layer.start) / 0.2);
                const isResult = index === layers.length - 1;
                const enterX = (1 - amount) * (150 + index * 34);
                const enterY = (1 - amount) * (38 + index * 12);

                return (
                  <article
                    className={`config-layer layer-${index + 1}${isResult ? " result-layer" : ""}`}
                    style={{
                      opacity: 0.07 + amount * 0.93,
                      filter: `blur(${(1 - amount) * 8}px)`,
                      transform: `translate3d(${enterX}px, ${enterY}px, 0) rotate(${layer.rotate + (1 - amount) * 2.5}deg)`,
                    }}
                    key={layer.label}
                    aria-hidden={amount < 0.5}
                  >
                    <span className="layer-number">{layer.number}</span>
                    <div className="layer-copy">
                      <p><strong>{layer.label}</strong><span> · {layer.value}</span></p>
                      {layer.match && <b>{layer.match}</b>}
                    </div>
                    <span className="layer-status">{layer.status}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
