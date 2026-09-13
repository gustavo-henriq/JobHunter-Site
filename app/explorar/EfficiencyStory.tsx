"use client";

import { useEffect, useRef } from "react";
import "./efficiency-story.css";

const metrics = [
  { value: "82%", title: "Filtros eliminam as vagas que não fazem sentido.", text: "Seus critérios orientam a seleção antes da IA. Assim, a análise se concentra nas oportunidades que combinam com o seu perfil.", note: "82% de redução observada em uma rodada histórica.", path: "M 20 225 C 85 225 95 205 150 199 S 224 165 275 140 S 363 120 400 78 S 455 62 480 35" },
  { value: "78%", title: "O sistema lembra. Você ganha tempo.", text: "Se a vaga e o perfil não mudaram, o JobHunter aproveita a análise que já fez. Menos trabalho repetido para continuar sua busca.", note: "78% de reaproveitamento observado na rodada analisada.", path: "M 20 225 C 90 225 100 216 150 185 S 210 175 255 120 S 350 65 400 55 S 455 46 480 35" },
  { value: "−42%", title: "Sua próxima busca fica mais rápida.", text: "Ao reaproveitar o que já sabe, o JobHunter leva menos tempo para concluir uma nova busca.", note: "42% menos tempo na comparação entre rodadas do mesmo perfil.", path: "M 20 225 C 80 220 105 170 150 155 S 240 145 285 107 S 350 96 390 65 S 450 48 480 35" },
];
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ramp = (n: number, a: number, b: number) => clamp((n - a) / (b - a));

export function EfficiencyStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 600px)");
    const scenes = Array.from(section.querySelectorAll<HTMLElement>(".jx-es-scene"));
    const curves = scenes.map(scene => scene.querySelector<SVGPathElement>(".jx-es-curve")!);
    const lengths = curves.map(curve => curve.getTotalLength());
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const panelHeight = section.querySelector<HTMLElement>(".jx-es-sticky")!.offsetHeight;
      const inset = Math.max(0, (window.innerHeight - panelHeight) / 2);
      const progress = clamp((inset - rect.top) / Math.max(1, rect.height - panelHeight)) * 3;
      scenes.forEach((scene, i) => {
        const local = progress - i;
        const staticMode = preference.matches;
        // Keep the first message visible on entry and overlap scene fades: no empty panel.
        const opacity = staticMode ? 1 : (i === 0 ? 1 : ramp(local, -.12, .08)) * (i === 2 ? 1 : 1 - ramp(local, .88, 1.08));
        const draw = staticMode ? 1 : ramp(local, .05, .48);
        scene.style.setProperty("--scene-opacity", String(opacity));
        scene.style.setProperty("--draw", String(draw));
        scene.style.setProperty("--title", String(staticMode || i === 0 ? 1 : ramp(local, -.08, .12)));
        scene.style.setProperty("--copy", String(staticMode ? 1 : ramp(local, .14, .32)));
        scene.setAttribute("aria-hidden", String(!staticMode && opacity < .5));
        const point = curves[i].getPointAtLength(draw * lengths[i]);
        const dot = scene.querySelector(".jx-es-dot");
        dot?.setAttribute("cx", String(point.x));
        dot?.setAttribute("cy", String(point.y));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);

  return <section className="jx-efficiency jx-es" id="jx-efficiency" ref={root} aria-label="Eficiência do JobHunter">
    <div className="jx-es-sticky">
      <div className="jx-es-scenes jx-wrap">
        {metrics.map((metric, i) => <article className="jx-es-scene" key={metric.value}>
          <div className="jx-es-chart">
            <strong>{metric.value}</strong>
            <svg viewBox="0 0 500 250" aria-hidden="true">
              <path className="jx-es-curve" d={metric.path} pathLength="1" />
              <circle className="jx-es-dot" cx="480" cy="35" r="5" />
            </svg>
          </div>
          <div className="jx-es-copy"><span className="jx-es-index">0{i + 1} / 03</span><h2>{metric.title}</h2><div className="jx-es-explanation"><p>{metric.text}</p><small>{metric.note}</small></div></div>
        </article>)}
      </div>
    </div>
  </section>;
}
