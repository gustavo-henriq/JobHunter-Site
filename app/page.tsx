export default function Home() {
  const sources = [
    ["Lever", "249"],
    ["Greenhouse", "105"],
    ["Ashby", "78"],
    ["Universidades", "10"],
    ["Kaszek", "1"],
  ];

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
          <div className="eyebrow"><span className="status-dot" /> Execução concluída · 09 ago 2026</div>
          <h1>Menos ruído.<br /><span>Mais vagas certas.</span></h1>
          <p className="hero-lead">
            Um pipeline inteligente que encontra, limpa e prioriza oportunidades
            de tecnologia — antes que você perca horas procurando.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#vagas">Explorar resultados <span>→</span></a>
            <a className="button button-ghost" href="#pipeline">Como funciona</a>
          </div>
          <p className="microcopy">Foco em estágio, júnior e início de carreira · São Paulo e remoto Brasil</p>
        </div>

        <div className="signal-card" aria-label="Resumo da última execução">
          <div className="signal-header">
            <div>
              <span className="overline">ÚLTIMA EXECUÇÃO</span>
              <strong>Funil de oportunidades</strong>
            </div>
            <span className="live-pill"><i /> 92,3s</span>
          </div>
          <div className="hero-number"><strong>443</strong><span>vagas coletadas</span></div>
          <div className="funnel" aria-label="443 coletadas, 350 únicas, 25 aprovadas e 4 novas entregues">
            <div className="funnel-row"><span>Coletadas</span><div><i style={{ width: "100%" }} /></div><b>443</b></div>
            <div className="funnel-row"><span>Únicas</span><div><i style={{ width: "79%" }} /></div><b>350</b></div>
            <div className="funnel-row"><span>Aprovadas</span><div><i style={{ width: "35%" }} /></div><b>25</b></div>
            <div className="funnel-row highlight"><span>Novas entregues</span><div><i style={{ width: "20%" }} /></div><b>4</b></div>
          </div>
          <div className="signal-footer">
            <span><b>93</b> duplicadas removidas</span>
            <span><b>16</b> análises reaproveitadas</span>
          </div>
        </div>
      </section>

      <section className="source-strip" aria-label="Fontes monitoradas">
        <span className="source-label">FONTES MONITORADAS</span>
        {sources.map(([name, count]) => (
          <span className="source" key={name}>{name} <b>{count}</b></span>
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
            <p>das 9 chamadas concluídas com sucesso na última execução.</p>
            <small>0 falhas · 0 timeouts</small>
          </article>
          <article className="metric-card">
            <span>QUALIDADE DO FUNIL</span>
            <strong>5,6%</strong>
            <p>chegaram à análise após filtros de senioridade, data e experiência.</p>
            <small>25 de 443 oportunidades</small>
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
          <article><span className="step">01</span><h3>Descobre</h3><p>Coleta em paralelo nos principais ATS e portais de tecnologia.</p><b>443 coletadas</b></article>
          <article><span className="step">02</span><h3>Normaliza</h3><p>Padroniza cargos, localização, senioridade e data de publicação.</p><b>350 únicas</b></article>
          <article><span className="step">03</span><h3>Prioriza</h3><p>Combina regras, qualidade da fonte e análise semântica por IA.</p><b>25 finalistas</b></article>
          <article><span className="step">04</span><h3>Entrega</h3><p>Envia apenas vagas novas e relevantes direto para o Telegram.</p><b>4 novos matches</b></article>
        </div>
      </section>

      <section className="section jobs-section" id="vagas">
        <div className="jobs-topline">
          <div>
            <span className="kicker">MATCHES EM DESTAQUE</span>
            <h2>Oportunidades que<br />merecem atenção.</h2>
          </div>
          <div className="threshold"><span>Nota mínima</span><strong>65+</strong></div>
        </div>
        <div className="jobs-list">
          {results.map((job) => (
            <article className="job-card" key={job.title}>
              <div className="score"><strong>{job.score}</strong><span>/100</span></div>
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
        <p className="data-note">Demonstração baseada na estrutura e nas métricas reais da última execução.</p>
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
            <div><span>CHAMADAS EVITADAS</span><strong>16</strong><small>em uma única execução</small></div>
            <div><span>REPROCESSAMENTO</span><strong>0</strong><small>persistência idempotente</small></div>
            <div><span>ENTREGAS EM 7 DIAS</span><strong>19</strong><small>notificações recentes</small></div>
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
