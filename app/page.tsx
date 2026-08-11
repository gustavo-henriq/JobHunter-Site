export default function Home() {
  const sources = ["Lever", "Greenhouse", "Ashby", "Universidades", "Kaszek"];

  const results = [
    {
      score: 95,
      title: "Estágio em Desenvolvimento",
      meta: "Empresa SaaS · Remoto Brasil",
      tags: ["Python", "APIs REST", "Git", "Estágio"],
      label: "Match excepcional",
    },
    {
      score: 90,
      title: "Analista de Suporte Técnico Jr.",
      meta: "Tecnologia B2B · Híbrido São Paulo",
      tags: ["Troubleshooting", "SQL", "SLA", "Júnior"],
      label: "Alta aderência",
    },
    {
      score: 85,
      title: "Assistente de Projetos de TI",
      meta: "Serviços digitais · São Paulo",
      tags: ["Projetos", "Dados", "Automação", "Entry level"],
      label: "Perfil compatível",
    },
  ];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="JobHunter — início">
          <span className="brand-mark" aria-hidden="true">JH</span>
          <span>JobHunter</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#resultados">Resultados</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#tecnologia">Tecnologia</a>
        </nav>
        <a className="header-cta" href="#vagas">Ver vagas <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> Busca inteligente de oportunidades</div>
          <h1>Quanto tempo você gasta buscando <em>oportunidades</em>?</h1>
          <p className="hero-lead">
            O JobHunter transforma horas de pesquisa em um fluxo automático que
            encontra, filtra e prioriza as vagas com maior aderência ao seu perfil.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#vagas">Explorar resultados <span>→</span></a>
            <a className="button button-ghost" href="#pipeline">Como funciona</a>
          </div>
          <p className="microcopy">Foco em estágio, júnior e início de carreira · São Paulo e remoto Brasil</p>
        </div>

        <div className="signal-card" aria-label="Resumo de eficiência do pipeline">
          <div className="signal-header">
            <div>
              <span className="overline">EFICIÊNCIA DO PIPELINE</span>
              <strong>Menos esforço, mais relevância</strong>
            </div>
            <span className="live-pill"><i /> AUTOMATIZADO</span>
          </div>
          <div className="hero-number"><strong>94,4%</strong><span>do ruído eliminado antes da IA</span></div>
          <div className="funnel" aria-label="94,4% de pré-filtragem, 79% de vagas únicas, 64% de análises reaproveitadas e 100% de estabilidade">
            <div className="funnel-row"><span>Pré-filtragem</span><div><i style={{ width: "94.4%" }} /></div><b>94,4%</b></div>
            <div className="funnel-row"><span>Vagas únicas</span><div><i style={{ width: "79%" }} /></div><b>79%</b></div>
            <div className="funnel-row"><span>Cache de IA</span><div><i style={{ width: "64%" }} /></div><b>64%</b></div>
            <div className="funnel-row highlight"><span>Estabilidade</span><div><i style={{ width: "100%" }} /></div><b>100%</b></div>
          </div>
          <div className="signal-footer">
            <span><b>0%</b> de reprocessamento</span>
            <span><b>100%</b> das chamadas concluídas</span>
          </div>
        </div>
      </section>

      <section className="source-strip" aria-label="Fontes monitoradas">
        <span className="source-label">FONTES MONITORADAS</span>
        {sources.map((name) => (
          <span className="source" key={name}>{name}</span>
        ))}
      </section>

      <section className="section results-section" id="resultados">
        <div className="section-heading split-heading">
          <div>
            <span className="kicker">RESULTADO PRIMEIRO</span>
            <h2>IA só onde<br />ela faz diferença.</h2>
          </div>
          <p>
            Regras objetivas eliminam vagas fora do perfil. A IA recebe apenas
            oportunidades relevantes, reduzindo custo sem sacrificar qualidade.
          </p>
        </div>
        <div className="metric-grid">
          <article className="metric-card accent-card">
            <span>ECONOMIA DE CHAMADAS</span>
            <strong>64%</strong>
            <p>das análises foram resolvidas pelo cache inteligente.</p>
            <div className="metric-line"><i /></div>
          </article>
          <article className="metric-card">
            <span>CONFIABILIDADE DA IA</span>
            <strong>100%</strong>
            <p>das análises concluídas sem falhas ou timeouts.</p>
            <small>Sem falhas · sem timeouts</small>
          </article>
          <article className="metric-card">
            <span>RUÍDO ELIMINADO</span>
            <strong>94,4%</strong>
            <p>das oportunidades fora do perfil barradas antes da etapa de IA.</p>
            <small>Mais precisão, menos processamento</small>
          </article>
        </div>
      </section>

      <section className="section pipeline-section" id="pipeline">
        <div className="section-heading centered-heading">
          <span className="kicker">PIPELINE DE DADOS</span>
          <h2>Do anúncio ao match,<br />sem trabalho manual.</h2>
          <p>Quatro etapas, uma entrega limpa e acionável.</p>
        </div>
        <div className="pipeline-grid">
          <article><span className="step">01</span><h3>Descobre</h3><p>Coleta em paralelo nos principais ATS e portais de tecnologia.</p><b>Busca multicanal</b></article>
          <article><span className="step">02</span><h3>Normaliza</h3><p>Padroniza cargos, localização, senioridade e data de publicação.</p><b>Deduplicação automática</b></article>
          <article><span className="step">03</span><h3>Prioriza</h3><p>Combina regras, qualidade da fonte e análise semântica por IA.</p><b>Score personalizado</b></article>
          <article><span className="step">04</span><h3>Entrega</h3><p>Envia apenas vagas novas e relevantes direto para o Telegram.</p><b>Entrega acionável</b></article>
        </div>
      </section>

      <section className="section jobs-section" id="vagas">
        <div className="jobs-topline">
          <div>
            <span className="kicker">MATCHES EM DESTAQUE</span>
            <h2>Oportunidades que<br />merecem atenção.</h2>
          </div>
          <div className="threshold"><span>Aderência mínima</span><strong>65%+</strong></div>
        </div>
        <div className="jobs-list">
          {results.map((job) => (
            <article className="job-card" key={job.title}>
              <div className="score"><strong>{job.score}%</strong><span>ADERÊNCIA</span></div>
              <div className="job-main">
                <span className="match-label">{job.label}</span>
                <h3>{job.title}</h3>
                <p>{job.meta}</p>
                <div className="tags">{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <span className="job-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
        <p className="data-note">Demonstração baseada na estrutura e nos indicadores reais do JobHunter.</p>
      </section>

      <section className="section roi-section">
        <div className="roi-panel">
          <div className="roi-copy">
            <span className="kicker">RETORNO MENSURÁVEL</span>
            <h2>Busca de vagas<br />com memória.</h2>
            <p>
              O JobHunter não recomeça do zero. Ele lembra o que já analisou,
              impede duplicatas e concentra processamento nas vagas realmente novas.
            </p>
          </div>
          <div className="roi-numbers">
            <div><span>MENOS CHAMADAS DE IA</span><strong>64%</strong><small>cache inteligente</small></div>
            <div><span>REPROCESSAMENTO</span><strong>0%</strong><small>persistência idempotente</small></div>
            <div><span>ESTABILIDADE DA ANÁLISE</span><strong>100%</strong><small>sem falhas ou timeouts</small></div>
          </div>
        </div>
      </section>

      <section className="section tech-section" id="tecnologia">
        <div>
          <span className="kicker">POR BAIXO DO CAPÔ</span>
          <h2>Engenharia pensada<br />para escala e clareza.</h2>
        </div>
        <div className="tech-content">
          <p>
            Arquitetura em camadas Bronze, Silver e Gold, coleta paralela,
            persistência idempotente e um worker de IA isolado.
          </p>
          <div className="tech-tags">
            {['Python 3.11+', 'Playwright', 'MongoDB', 'Gemini AI', 'REST APIs', 'Docker', 'Pytest', 'Telegram'].map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">JH</span><span>JobHunter</span></a>
        <p>Vagas certas, antes do ruído.</p>
        <p>Projeto de Gustavo Henrique · 2026</p>
      </footer>
    </main>
  );
}
