"use client";
import { useEffect, useRef } from "react";
import "./profile-deck.css";

type Profile = { area: string; reason: string; tags: string[]; symbol: string };
const pose = (rank: number) => `translate(${rank * 9}px, ${-rank * 14}px) rotate(${rank * 2}deg) scale(${1 - rank * .035})`;
export function ProfileDeck({ profiles, selected }: { profiles: Profile[]; selected: number }) {
  const pile = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLElement | null)[]>([]);
  const order = useRef(profiles.map((_, i) => i));
  const desired = useRef(selected);
  const busy = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    const element = pile.current;
    const section = element?.closest(".jx-story");
    if (!element || !section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const amount = preference.matches ? 0 : (progress - .5) * 2;
      const distance = window.innerWidth < 700 ? 8 : 15;
      element.style.transform = `translateY(${-amount * distance}px) rotate(${amount * .65}deg)`;
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
  useEffect(() => {
    mounted.current = true;
    const cards = nodes.current;
    return () => {
      mounted.current = false;
      cards.forEach(card => card?.getAnimations().forEach(animation => animation.cancel()));
    };
  }, []);
  useEffect(() => {
    desired.current = selected;
    const run = async () => {
      if (busy.current) return;
      busy.current = true;
      try {
        while (mounted.current && order.current[0] !== desired.current) {
          const target = desired.current;
          const previous = [...order.current];
          const rank = previous.indexOf(target);
          const card = nodes.current[target];
          if (!card || rank < 0) break;
          const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          // Start from the card's actual rank; deeper cards travel a little farther.
          const outside = `translate(${-8 - rank * 3}px, ${card.offsetHeight * (.72 + rank * .045)}px) rotate(${-2 - rank}deg) scale(.97)`;
          if (!reduced) {
            const leave = card.animate([{ transform: pose(rank) }, { transform: outside }], { duration: 230 + rank * 30, easing: "cubic-bezier(.45,0,.65,.6)", fill: "forwards" });
            await leave.finished;
            card.style.transform = outside;
            leave.cancel();
          }
          if (!mounted.current) break;
          const next = [target, ...previous.filter(id => id !== target)];
          order.current = next;
          const moves: Animation[] = [];
          next.forEach((id, position) => {
            const node = nodes.current[id]!;
            node.style.zIndex = String(10 - position);
            node.dataset.rank = String(position);
            node.setAttribute("aria-hidden", String(position !== 0));
            node.style.transform = pose(position);
            if (!reduced) {
              const frames = id === target ? [
                { transform: outside, offset: 0 },
                { transform: "translate(0, -5px) rotate(.45deg) scale(1.006)", offset: .8 },
                { transform: pose(position), offset: 1 },
              ] : [
                { transform: pose(previous.indexOf(id)), offset: 0 },
                { transform: `translate(${position * 9 + 3}px, ${-position * 14 - 3}px) rotate(${position * 2 + .6}deg) scale(${1 - position * .035})`, offset: .72 },
                { transform: pose(position), offset: 1 },
              ];
              moves.push(node.animate(frames, { duration: id === target ? 520 : 430, easing: "cubic-bezier(.22,1,.36,1)" }));
            }
          });
          await Promise.all(moves.map(animation => animation.finished));
        }
      } catch { /* Cancelled on unmount. */ } finally { busy.current = false; }
    };
    void run();
  }, [selected]);
  return <div ref={pile} className="jx-profile-pile" aria-label="Perfis modulares">
    {profiles.map((profile, id) => <article key={profile.area} ref={node => { nodes.current[id] = node; }}
      className="jx-profile-card" data-rank={id} aria-hidden={id !== 0}
      style={{ transform: pose(id), zIndex: 10 - id }}>
      <span className="jx-symbol" aria-hidden="true">{profile.symbol}</span>
      <h3>{profile.area}</h3><p>{profile.reason}</p>
      <div className="jx-tags">{profile.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="jx-profile-foot"><span>O critério é seu.</span><b>A busca acompanha. ↗</b></div>
    </article>)}
  </div>;
}
