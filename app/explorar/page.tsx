"use client";

import { useEffect, useRef, useState } from "react";
import { ProfileDeck } from "./ProfileDeck";
import { TunnelHero } from "./TunnelHero";
import { EfficiencyStory } from "./EfficiencyStory";
import "./preview.css";
import "./typography.css";
import "./palette.css";

const profiles = [
  { area: "Tecnologia", title: "Analista de Dados Júnior", tags: ["SQL", "Dados", "Remoto"], reason: "Cruza suas habilidades em análise com oportunidades de entrada em dados.", symbol: "⌘" },
  { area: "Marketing", title: "Assistente de Marketing", tags: ["Conteúdo", "Campanhas", "Híbrido"], reason: "Prioriza criação de conteúdo e campanhas de acordo com o seu momento profissional.", symbol: "↗" },
  { area: "Atendimento", title: "Analista de Atendimento", tags: ["Relacionamento", "Suporte", "Remoto"], reason: "Conecta sua experiência com pessoas às condições de trabalho que você procura.", symbol: "✳" },
  { area: "Recursos humanos", title: "Estágio em Recursos Humanos", tags: ["Cultura", "Comunicação", "Estágio"], reason: "Encontra caminhos em cultura e comunicação compatíveis com a sua formação.", symbol: "◎" },
];
const steps = [
  ["Encontra", "Sua busca começa em várias fontes.", "O JobHunter reúne oportunidades de diferentes plataformas em um único fluxo."],
  ["Filtra", "Só o que faz sentido avança.", "Critérios do seu perfil barram incompatibilidades antes da análise por IA."],
  ["Entende", "Um match precisa de contexto.", "A IA avalia aderência e explica os pontos compatíveis e o que ainda falta."],
  ["Entrega", "A próxima decisão é sua.", "O resultado chega organizado no Telegram, com contexto e acesso à oportunidade."],
];

export default function Explore() {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState(false);
  const root = useRef<HTMLElement>(null);
  const story = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const profile = profiles[selected];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = root.current?.querySelectorAll("[data-enter]");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("entered"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    targets?.forEach(target => { if (!reduced) target.classList.add("enter-ready"); observer.observe(target); });
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
      if (story.current) {
        const rect = story.current.getBoundingClientRect();
        const fraction = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
        story.current.style.setProperty("--journey", String(fraction));
      }
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); };
  }, []);

  return <main className="jx" ref={root}>
    <div className="jx-progress" ref={progress} />
    <a className="jx-skip" href="#jx-main">Pular para o conteúdo</a>


    <TunnelHero title={profile.title} tags={profile.tags} />



    <section className="jx-story" id="jx-profiles" ref={story}>
      <div className="jx-story-sticky jx-wrap">
        <div className="jx-story-copy" data-enter><span className="jx-eyebrow">01 / FEITO PARA MUDAR COM VOCÊ</span><h2>Suas metas mudam.<br />O JobHunter<br /><em>acompanha.</em></h2><p>Troque de área, ajuste seus critérios e explore um novo caminho. A busca se adapta ao perfil que você define.</p><div className="jx-choices" aria-label="Escolher área para a demonstração">{profiles.map((item, index) => <button key={item.area} aria-pressed={selected === index} onClick={() => { setSelected(index); setDetails(false); }}>{item.area}<span>↗</span></button>)}</div><span className="jx-note">Escolha uma área para experimentar.</span></div>
        <ProfileDeck profiles={profiles} selected={selected} />
      </div>
    </section>

    <section className="jx-flow jx-wrap" id="jx-flow">
      <div className="jx-heading" data-enter><span className="jx-eyebrow">02 / DA BUSCA À POSSIBILIDADE</span><h2>O trabalho acontece.<br /><em>Você segue em frente.</em></h2></div>
      <div className="jx-flow-layout" data-enter><div className="jx-steps" aria-label="Etapas da busca">{steps.map((item, index) => <button key={item[0]} aria-pressed={step === index} onClick={() => setStep(index)}><span>0{index + 1}</span><b>{item[0]}</b><span>↗</span></button>)}</div><article className="jx-step-content" key={step}><div className="jx-stage-label">ETAPA 0{step + 1} <span>●</span></div><h3>{steps[step][1]}</h3><p>{steps[step][2]}</p><div className="jx-stage-track" aria-hidden="true">{steps.map((item, index) => <span className={index <= step ? "done" : ""} key={item[0]}>{index < step ? "✓" : `0${index + 1}`}</span>)}</div></article></div>
    </section>

    <EfficiencyStory />

    <section className="jx-delivery jx-wrap" id="jx-delivery" data-enter><div><span className="jx-eyebrow">04 / DIRETO NO SEU TELEGRAM</span><h2>Chega a oportunidade.<br /><em>Fica a escolha.</em></h2><p>Saiba por que uma vaga combina com você antes de abrir mais uma aba.</p><a className="jx-text-link" href="https://t.me/gutosmboy" target="_blank" rel="noreferrer">Quero conhecer as entregas reais ↗</a></div><article className="jx-telegram"><div className="jx-message-head"><span className="jx-bot"><img className="jx-brand-mark" src="/job-hunter-encaixe.png" alt="" /></span><div><b>JobHunter Bot</b><small>Prévia de entrega · exemplo</small></div></div><h3>{profile.title}</h3><div className="jx-tags">{profile.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="jx-disclosure" aria-expanded={details} aria-controls="jx-match-detail" onClick={() => setDetails(!details)}>Por que essa oportunidade? <span>{details ? "−" : "+"}</span></button><div id="jx-match-detail" hidden={!details}><p>{profile.reason}</p><small>Na entrega real, a análise também aponta requisitos ausentes.</small></div><a className="jx-telegram-link" href="https://t.me/gutosmboy" target="_blank" rel="noreferrer">Conversar sobre o JobHunter ↗</a><small className="jx-note">Demonstração. Não representa uma vaga aberta.</small></article></section>

    <section className="jx-contact" id="jx-contact" data-enter><span className="jx-eyebrow">SEU PRÓXIMO PASSO COMEÇA COM UMA CONVERSA</span><h2>Menos procurando.<br /><em>Mais acontecendo.</em></h2><a className="jx-button" href="https://t.me/gutosmboy" target="_blank" rel="noreferrer">Vamos conversar no Telegram <span>↗</span></a></section>
    <div className="jx-footer jx-wrap"><a className="jx-logo" href="#jx-main"><img className="jx-brand-mark" src="/job-hunter-encaixe.png" alt="" />jobhunter</a><span>Uma criação de Gustavo Henrique.</span></div>
  </main>;
}
