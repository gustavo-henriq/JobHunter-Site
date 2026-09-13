import { ModularProfiles } from "./ModularProfiles";
import { MotionEffects } from "./MotionEffects";
import { TelegramDelivery } from "./TelegramDelivery";

export default function Home() {
  const sources = ["Catho", "Indeed", "Lever", "Greenhouse", "Ashby", "Universidades", "Kaszek"];

  const results = [
    {
      score: 95,
      title: "Analista de Dados Júnior",
      meta: "Perfil Tecnologia · Remoto Brasil",
      tags: ["Dados", "SQL", "Dashboards", "Júnior"],
      label: "Match excepcional",
    },
    {
      score: 90,
      title: "Assistente Administrativo",
      meta: "Perfil Operações · Híbrido São Paulo",
      tags: ["Processos", "Excel", "Atendimento", "Entry level"],
      label: "Alta aderência",
    },
    {
      score: 85,
      title: "Designer de Produto Júnior",
      meta: "Perfil Criativo · Remoto Brasil",
      tags: ["UX", "Pesquisa", "Prototipação", "Júnior"],
      label: "Perfil compatível",
    },
  ];

  return (
    <main>
      <MotionEffects />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="JobHunter — início">
          <span className="brand-mark" aria-hidden="true">JH</span>
          <span>JobHunter</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#perfis">Perfis</a>
          <a href="#resultados">Resultados</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#tecnologia">Tecnologia</a>
        </nav>
        <a className="header-cta" href="#oportunidades">Ver oportunidades <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> Busca inteligente de oportunidades</div>
          <h1>Quanto tempo você gasta buscando <em>oportunidades</em>?</h1>
          <p className="hero-lead">
            O JobHunter transforma horas de pesquisa em um fluxo automático que
            encontra, filtra e prioriza as oportunidades com maior aderência ao seu perfil.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#oportunidades">Explorar resultados <span>→</span></a>
            <a className="button button-ghost" href="#pipeline">Como funciona</a>
          </div>
          <p className="microcopy">Perfis, critérios e objetivos ajustáveis a qualquer busca profissional.</p>
        </div>

        <div className="signal-card" data-tilt aria-label="Resumo de eficiência do pipeline">
          <div className="signal-header">
            <div>
              <span className="overline">EFICIÊNCIA DA ARQUITETURA</span>
              <strong>Só o que faz sentido avança</strong>
            </div>
            <span className="live-pill"><i /> AUDITÁVEL</span>
          </div>
          <div className="hero-number"><strong>82%</strong><span>do ruído barrado antes da análise por IA</span></div>
          <div className="relevance-proof">
            <span>FILTROS DE RELEVÂNCIA PRIMEIRO</span>
            <p>Critérios objetivos eliminam incompatibilidades e concentram a IA nas oportunidades mais alinhadas a cada perfil.</p>
          </div>
          <div className="signal-footer">
            <span><b>145</b> alertas entregues nos logs</span>
            <span>Filtros objetivos antes da IA</span>
          </div>
        </div>
      </section>

      <section className="source-strip" aria-label="Fontes monitoradas">
        <span className="source-label">FONTES MONITORADAS</span>
        {sources.map((name) => (
          <span className="source" key={name}>{name}</span>
        ))}
      </section>

      <ModularProfiles />

      <section className="section results-section" id="resultados">
        <div className="section-heading split-heading" data-reveal="up">
          <div>
            <span className="kicker">EVIDÊNCIA ACUMULADA</span>
            <h2>O resultado está<br />nos envios.</h2>
          </div>
          <p>
            Os registros locais somam todas as entregas novas do sistema — sem
            confundir vagas coletadas, reanálises e alertas já enviados.
          </p>
        </div>
        <div className="delivery-history" data-reveal="up">
          <article className="delivery-total">
            <span>ALERTAS ENTREGUES</span>
            <strong>145</strong>
            <p>oportunidades novas enviadas pelo JobHunter.</p>
          </article>
          <div className="profile-delivery-split" aria-label="Entregas por perfil">
            <div><strong>74</strong><span>IA e Web</span></div>
            <div><strong>71</strong><span>Psicologia, RH e Comunicação</span></div>
          </div>
        </div>
      </section>

      <section className="section pipeline-section" id="pipeline">
        <div className="section-heading centered-heading" data-reveal="up">
          <span className="kicker">PIPELINE DE DADOS</span>
          <h2>Do anúncio ao match,<br />sem trabalho manual.</h2>
          <p>Quatro etapas, uma entrega limpa e acionável.</p>
        </div>
        <div className="pipeline-grid" data-flow>
          <article data-reveal="up"><span className="step">01</span><h3>Descobre</h3><p>Executa fontes em paralelo e preserva o lote já coletado se uma delas limitar detalhes.</p><b>Workers independentes</b></article>
          <article data-reveal="up" data-reveal-delay="100"><span className="step">02</span><h3>Normaliza</h3><p>Guarda o bruto, padroniza os campos e reconhece vagas vistas em rodadas anteriores.</p><b>Bronze + Silver</b></article>
          <article data-reveal="up" data-reveal-delay="200"><span className="step">03</span><h3>Prioriza</h3><p>Aplica regras antes da IA e reaproveita scores quando conteúdo, perfil e versão não mudam.</p><b>Cache semântico versionado</b></article>
          <article data-reveal="up" data-reveal-delay="300"><span className="step">04</span><h3>Entrega</h3><p>Reivindica cada alerta antes do envio e publica somente oportunidades novas no Telegram.</p><b>Envio idempotente</b></article>
        </div>
      </section>

      <section className="section jobs-section" id="oportunidades">
        <div className="jobs-topline" data-reveal="up">
          <div>
            <span className="kicker">DEMONSTRAÇÃO DE RESULTADOS</span>
            <h2>Oportunidades que<br />merecem atenção.</h2>
          </div>
          <div className="threshold"><span>Filtro configurável</span><strong>65%+</strong></div>
        </div>
        <div className="jobs-list">
          {results.map((job, index) => (
            <a
              className="job-card"
              key={job.title}
              data-reveal="up"
              data-reveal-delay={index * 100}
              href="https://t.me/gutosmboy"
              target="_blank"
              rel="noreferrer"
              aria-label={`Conhecer no Telegram um exemplo de busca para ${job.title}`}
            >
              <div className="score"><strong>{job.score}%</strong><span>ADERÊNCIA</span></div>
              <div className="job-main">
                <span className="match-label">Exemplo · {job.label}</span>
                <h3>{job.title}</h3>
                <p>{job.meta}</p>
                <div className="tags">{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <span className="job-arrow" aria-hidden="true"><span>Telegram</span> ↗</span>
            </a>
          ))}
        </div>
        <p className="data-note">
          Cenários ilustrativos — não representam vagas abertas. Fale comigo no Telegram para conhecer entregas reais.
        </p>
      </section>

      <section className="section delivery-section" id="entrega">
        <div className="delivery-copy" data-reveal="up">
          <span className="kicker">ENTREGA NA VIDA REAL</span>
          <h2>A vaga certa chega.<br />Você só decide.</h2>
          <p>
            Cada oportunidade aprovada chega no Telegram com aderência, fonte,
            perfil utilizado e os motivos do match — pronta para você avaliar.
          </p>
          <div className="delivery-proofline">
            <span>CONTEXTO COMPLETO</span>
            <span>MATCH EXPLICADO</span>
            <span>LINK DIRETO</span>
          </div>
        </div>
        <TelegramDelivery />
      </section>

      <section className="section roi-section" id="eficiencia">
        <div className="roi-panel" data-reveal="scale">
          <div className="roi-copy">
            <span className="kicker">EFICIÊNCIA INCREMENTAL</span>
            <h2>A segunda rodada<br />fica mais leve.</h2>
            <p>
              Na repetição do mesmo perfil, a memória do pipeline economizou
              chamadas de IA, reduziu o tempo e ainda encontrou uma vaga nova.
            </p>
          </div>
          <div className="roi-numbers">
            <div><span>MENOS CHAMADAS REPETIDAS À IA</span><strong>78%</strong><small>Resultados válidos são reutilizados quando nada relevante mudou.</small></div>
            <div><span>MENOS TEMPO POR CICLO</span><strong>−42%</strong><small>O pipeline responde mais rápido sem sacrificar novas descobertas.</small></div>
          </div>
        </div>
      </section>

      <section className="section tech-section" id="tecnologia">
        <div data-reveal="up">
          <span className="kicker">POR BAIXO DO CAPÔ</span>
          <h2>Engenharia pensada<br />para escala e clareza.</h2>
        </div>
        <div className="tech-content" data-reveal="up" data-reveal-delay="120">
          <p>
            Bronze, Silver e Gold separam coleta, normalização e recomendação.
            Fontes e IA rodam isoladas; cache e travas de envio mantêm o fluxo econômico e recuperável.
          </p>
          <div className="tech-proof-grid">
            <div><b>FALHA ISOLADA</b><span>Um bloqueio de fonte não descarta o lote já coletado.</span></div>
            <div><b>CACHE VERSIONADO</b><span>Conteúdo inalterado não volta para a IA.</span></div>
            <div><b>ANTI-DUPLICATA</b><span>Cada alerta é reservado antes de ser enviado.</span></div>
          </div>
          <div className="tech-tags">
            {['Python 3.11+', 'Playwright', 'MongoDB', 'Gemini AI', 'REST APIs', 'Docker', 'Pytest', 'Telegram'].map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contato" data-reveal="scale">
        <div className="contact-copy">
          <span className="kicker">VAMOS CONVERSAR</span>
          <h2>Se interessou e quer<br />conhecer o sistema?</h2>
          <p>Eu te mostro como o JobHunter pode se adaptar à sua busca.</p>
        </div>
        <a
          className="button contact-button"
          href="https://t.me/gutosmboy"
          target="_blank"
          rel="noreferrer"
        >
          Conversar no Telegram <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">JH</span><span>JobHunter</span></a>
        <p>Vagas certas, antes do ruído.</p>
        <p>Projeto de Gustavo Henrique · 2026</p>
      </footer>
    </main>
  );
}
