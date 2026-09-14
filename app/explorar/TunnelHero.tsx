"use client";
/* eslint-disable @next/next/no-img-element -- the tiny local brand mark is already optimized */

import { useEffect, useRef } from "react";
import "./tunnel.css";
import "./tunnel-side.css";
import "./tunnel-gather.css";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };
const phase = (p: number, a: number, b: number) => ease((p - a) / (b - a));

export function TunnelHero({ title, tags }: { title: string; tags: string[] }) {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const hook = useRef<HTMLDivElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const deliveries = useRef<(HTMLElement | null)[]>([]);
  const hint = useRef<HTMLDivElement>(null);
  // Keep three distinct examples when the selected profile changes.
  const notificationExamples = [
    { title, detail: tags.join(" · ") },
    ...[
      { title: "Assistente de Marketing", detail: "Conteúdo · Campanhas · Híbrido" },
      { title: "Analista de Atendimento", detail: "Relacionamento · Suporte · Remoto" },
      { title: "Estágio em Recursos Humanos", detail: "Cultura · Comunicação · Estágio" },
    ].filter(job => job.title !== title),
  ].slice(0, 3);

  useEffect(() => {
    const el = section.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = media.matches;
    let width = 0, height = 0, p = 0, targetProgress = 0, raf = 0, visible = true;
    let last = 0;
    const lineCount = () => width < 700 ? 30 : 54;
    const focusLine = () => Math.round((lineCount() - 1) * .79);
    // Every node uses the same sampled polyline as its visible wire.
    const pathPoint = (index: number, t: number, time = 0) => {
      const sample = (position: number) => {
        const spread = index / (lineCount() - 1) * 2 - 1;
        const funnel = Math.pow((Math.cos(clamp(position / .7) * Math.PI) + 1) / 2, .85);
        const wave = index === focusLine() ? 0 : Math.sin(position * 7 + index * .22 + (reduced ? 0 : time * .0004)) * 2 * funnel;
        // Keep the 2D tunnel legible on narrow screens: its throat now travels
        // farther across the stage instead of ending halfway through the frame.
        return { x: width * (-.12 + position * .82),
          y: height * (width < 700 ? .7 : .52) + spread * (height * .46 * funnel + 5) + wave };
      };
      const segment = clamp(t) * 48;
      const start = Math.floor(segment);
      const a = sample(start / 48), b = sample(Math.min(48, start + 1) / 48);
      return { x: a.x + (b.x - a.x) * (segment - start), y: a.y + (b.y - a.y) * (segment - start) };
    };
    // The wire, gathering nodes and cards share one coordinate system.
    const zoomAt = () => 1 + phase(p, .08, .52) * 1.2;
    const screenPoint = (index: number, t: number, time = 0) => {
      const point = pathPoint(index, t, time);
      const cx = width * .42, cy = height * (width < 700 ? .7 : .52);
      return { x: cx + (point.x - cx) * zoomAt(), y: cy + (point.y - cy) * zoomAt() };
    };
    // Stable, irregular spacing across distinct wires; never a grid or per-frame randomness.
    const gatheringSlots = [
      [.79, .644], [.39, .657], [.64, .628], [.18, .665], [.88, .648],
      [.53, .675], [.30, .637], [.71, .668], [.09, .646], [.46, .622],
      [.95, .660], [.24, .631], [.59, .653], [.82, .639], [.34, .671],
    ];
    const variation = (id: number, salt: number) => {
      const value = Math.sin(id * 127.1 + salt * 311.7) * 43758.5453;
      return value - Math.floor(value);
    };
    const opportunityWire = (id: number) => Math.round((lineCount() - 1) * gatheringSlots[id][0]);
    const gatheringPosition = (id: number) => gatheringSlots[id][1];
    const opportunityPoint = (id: number, time = 0) => {
      const start = .115 + variation(id, 1) * .14;
      const travel = phase(p, .035 + variation(id, 2) * .075, .46 + variation(id, 3) * .075);
      // Interpolate path distance, not screen coordinates: no shortcuts across the wires.
      return screenPoint(opportunityWire(id), start + (gatheringPosition(id) - start) * travel, time);
    };
    const deliveryLayout = () => {
      const mobile = width < 700;
      const cardWidth = Math.min(mobile ? width - 40 : width * .36, 390);
      const targetX = mobile ? (width - cardWidth) / 2 : width * .08;
      const highestSource = Math.min(...[0, 1, 2].map(id => screenPoint(opportunityWire(id), gatheringPosition(id)).y));
      // All destination icon centres are ABOVE the gathering points, including on mobile.
      const targetY = Math.min(height * (mobile ? .69 : .45), height - 152, highestSource - 35 - 18);
      const stackStep = Math.min(76, Math.max(0, (targetY - 24) / 2));
      return { cardWidth, targetX, targetY, stackStep };
    };
    const setVisibility = (node: HTMLElement | null, opacity: number, offset = 0) => {
      if (!node) return;
      node.style.opacity = String(opacity);
      node.style.transform = `translateY(${offset}px)`;
      node.inert = opacity < .85;
      node.style.visibility = opacity <= .001 ? "hidden" : "visible";
    };
    const layout = () => {
      width = el.clientWidth;
      // Match the actual sticky stage (100svh), including mobile browser chrome.
      height = el.querySelector<HTMLElement>(".th-stage")?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const readProgress = () => {
      const rect = el.getBoundingClientRect();
      // Reserve a short, stationary reading beat after the last notification.
      const readingDistance = height * .65;
      targetProgress = reduced ? 0 : clamp(-rect.top / Math.max(1, rect.height - height - readingDistance));
    };
    const update = (time = 0) => {
      setVisibility(intro.current, 1 - phase(p, .22, .34), -phase(p, .22, .34) * 24);
      setVisibility(hook.current, phase(p, .29, .42) * (1 - phase(p, .67, .76)), 14 * (1 - phase(p, .29, .42)));
      setVisibility(end.current, reduced ? 1 : phase(p, .73, .83), 16 * (1 - phase(p, .73, .83)));
      if (hint.current) hint.current.style.opacity = String(1 - phase(p, .07, .16));
      const { cardWidth, targetX, targetY, stackStep } = deliveryLayout();
      deliveries.current.forEach((item, i) => {
        if (!item) return;
        const departure = .55 + i * .105;
        const migrate = phase(p, departure, departure + .14);
        const expand = phase(p, departure + .14, departure + .21);
        // Departure starts at the same fixed point where this node reached its wire's queue.
        const source = p <= departure ? opportunityPoint(i, time) : screenPoint(opportunityWire(i), gatheringPosition(i));
        const destination = { x: targetX + 35, y: targetY + 35 };
        const controlA = { x: source.x + Math.min(32, width * .04), y: source.y + (destination.y - source.y) * .32 };
        const controlB = { x: destination.x, y: source.y + (destination.y - source.y) * .78 };
        const inverse = 1 - migrate;
        const x = inverse ** 3 * source.x + 3 * inverse ** 2 * migrate * controlA.x + 3 * inverse * migrate ** 2 * controlB.x + migrate ** 3 * destination.x;
        const y = inverse ** 3 * source.y + 3 * inverse ** 2 * migrate * controlA.y + 3 * inverse * migrate ** 2 * controlB.y + migrate ** 3 * destination.y;
        let rise = 0;
        for (let later = i + 1; later < 3; later++) rise += phase(p, .69 + later * .105, .76 + later * .105) * stackStep;
        const compact = i < 2 ? phase(p, .69 + (i + 1) * .105, .76 + (i + 1) * .105) : 0;
        // Earlier notifications shrink as they move up, keeping every title readable.
        const cardHeight = 132 + (stackStep - 8 - 132) * compact;
        const size = i === 0 ? 6 : 4;
        const content = reduced ? 1 : phase(p, departure + .175, departure + .215);
        Object.assign(item.style, {
          // Clear coordinates left behind by earlier hot-reloaded versions.
          left: "0px",
          top: "0px",
          transform: `translate3d(${x - (size / 2 + (35 - size / 2) * expand)}px,${y - (size / 2 + (35 - size / 2) * expand) - rise}px,0)`,
          width: `${size + (cardWidth - size) * expand}px`,
          height: `${size + (cardHeight - size) * expand}px`,
          borderRadius: `${size / 2 + (18 - size / 2) * expand}px`,
          backgroundColor: `rgb(${Math.round(202 - 143 * expand)},${Math.round(219 - 171 * expand)},${Math.round(136 - 68 * expand)})`,
          boxShadow: `inset 0 0 0 1px rgba(238,232,221,${.16 * expand}), 0 ${10 * expand}px ${24 * expand}px rgba(12,8,17,${.22 * expand}), 0 0 ${8 * (1 - expand)}px rgba(202,219,136,${.17 * (1 - expand)})`,
          opacity: "1",
        });
        item.style.setProperty("--content", String(content));
        item.style.setProperty("--compact", String(reduced ? 0 : compact));
        (item.firstElementChild as HTMLElement).style.width = `${cardWidth}px`;
        item.setAttribute("aria-hidden", String(!reduced && content < .85));
      });
    };
    const draw = (time: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      // Frame-rate-independent damping absorbs wheel steps without throttling rendering.
      const elapsed = last ? Math.min(64, Math.max(1, time - last)) : 16;
      last = time;
      p = reduced ? 0 : p + (targetProgress - p) * (1 - Math.exp(-elapsed / 85));
      if (Math.abs(targetProgress - p) < .00002) p = targetProgress;
      update(time);
      ctx.clearRect(0, 0, width, height);
      const fade = reduced ? .5 : 1 - phase(p, .56, .78);
      if (fade > .001) {
        const zoom = zoomAt();
        const cx = width * .42, cy = height * (width < 700 ? .7 : .52);
        ctx.save(); ctx.globalAlpha = fade;
        ctx.translate(cx, cy); ctx.scale(zoom, zoom); ctx.translate(-cx, -cy);
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * .55);
        glow.addColorStop(0, "rgba(202,219,136,.045)"); glow.addColorStop(.5, "rgba(132,110,148,.025)"); glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow; ctx.fillRect(-width, -height, width * 3, height * 3);
        const count = lineCount();
        const point = (index: number, t: number) => pathPoint(index, t, time);
        for (let i = 0; i < count; i++) {
          ctx.beginPath();
          for (let j = 0; j <= 48; j++) { const v = point(i, j / 48); if (!j) ctx.moveTo(v.x, v.y); else ctx.lineTo(v.x, v.y); }
          ctx.strokeStyle = i % 6 === 0 ? "rgba(220,209,228,.3)" : "rgba(177,156,190,.19)";
          ctx.lineWidth = .65 / Math.sqrt(zoom); ctx.stroke();
          if (i === focusLine()) continue;
          const t = reduced ? (i * .137) % .78 : ((time * .000035 + i * .137) % .9);
          // Ambient traffic recedes as the persistent selected nodes gather.
          const alpha = (1 - ease((t - .4) / .2)) * (1 - phase(p, .28, .49));
          if (alpha <= 0) continue;
          const v = point(i, t);
          ctx.beginPath(); ctx.arc(v.x, v.y, 1.3 / zoom, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224,215,231,${alpha})`; ctx.fill();
        }
        ctx.restore();
      }
      if (!reduced && p < .98) {
        const remaining = 1 - phase(p, .79, .98);
        for (let i = 3; i < 15; i++) {
          const node = opportunityPoint(i, time);
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(202,219,136,${remaining * .85})`;
          ctx.fill();
        }
      }
      // The completed scene is still: don't keep redrawing after the reading hold.
      if (!reduced && (p < .98 || p !== targetProgress)) raf = requestAnimationFrame(draw);
    };
    const schedule = () => { if (!raf && visible) raf = requestAnimationFrame(draw); };
    const scroll = () => { readProgress(); schedule(); };
    const resize = () => { layout(); readProgress(); p = targetProgress; update(); schedule(); };
    const preference = () => { reduced = media.matches; resize(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { readProgress(); p = targetProgress; last = 0; schedule(); } else { cancelAnimationFrame(raf); raf = 0; } });
    observer.observe(el);
    layout(); readProgress(); p = targetProgress; update(); schedule();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", schedule);
    media.addEventListener("change", preference);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", schedule); media.removeEventListener("change", preference); };
  }, []);

  return <section className="th" id="jx-main" ref={section} aria-label="Da busca à oportunidade">
    <div className="th-stage">
      <canvas ref={canvas} aria-hidden="true" />
      <div className="th-shade" />
      <div className="th-intro" ref={intro}>
        <span className="jx-eyebrow">SUA PRÓXIMA POSSIBILIDADE ESTÁ A CAMINHO</span>
        <h1>Quanto tempo<br />você gasta buscando<br /><em>oportunidades?</em></h1>
        <p>Entre tantas vagas, existe uma que faz sentido para você.</p>
        <a href="#jx-profiles" className="th-skip">Ir direto aos perfis ↗</a>
      </div>
      <div className="th-hook th-gather-copy" ref={hook}><h2>Comece a gastar<br />seu tempo com<br /><em>o que realmente importa.</em></h2></div>
      <div className="th-end" ref={end}><span className="jx-eyebrow">DO FLUXO PARA O SEU TELEGRAM</span><h2>Você segue <br />o seu dia.<br /><em>As oportunidades <br />chegam até você.</em></h2><a className="jx-button" href="#jx-profiles">Encontre seu próximo passo ↗</a></div>
      <div className="th-deliveries" aria-label="Exemplos de notificações">
        {notificationExamples.map((job, i) =>
          <article key={i} className="th-delivery" ref={node => { deliveries.current[i] = node; }} aria-hidden="true" style={{ zIndex: 4 + i }}>
            <div className="th-card-content"><span className="th-app"><img className="jx-brand-mark" src="/job-hunter-encaixe.png" alt="" width="28" height="28" /></span><div><b>JobHunter <span>· agora</span></b><small>Vaga encontrada</small><strong>{job.title}</strong><p>{job.detail}</p></div></div>
          </article>
        )}
      </div>
      <div className="th-hint" ref={hint}><span>ROLE PARA ACOMPANHAR</span><i>↓</i></div>
      <span className="th-scene-label" aria-hidden="true">JOBHUNTER / DA BUSCA AO ENCONTRO</span>
    </div>
  </section>;
}
