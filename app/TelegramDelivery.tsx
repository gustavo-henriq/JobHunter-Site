export function TelegramDelivery() {
  const strengths = [
    "Excel",
    "Google Sheets",
    "Inteligência Artificial",
    "Cultura organizacional",
    "Endomarketing",
  ];

  return (
    <figure className="telegram-showcase" data-reveal="scale" data-reveal-delay="120">
      <div
        className="telegram-stage"
        aria-label="Exemplo visual de uma oportunidade entregue pelo JobHunter"
      >
        {/* Generated atmospheric artwork is intentionally served as-is. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="telegram-atmosphere"
          src="/jobhunter-delivery-atmosphere-green-v2.png"
          alt=""
          width="1536"
          height="1024"
          aria-hidden="true"
        />

        <div className="telegram-ambient telegram-ambient-left" aria-hidden="true">
          <span>Nova oportunidade</span>
          <strong>Perfil de RH</strong>
        </div>
        <div className="telegram-ambient telegram-ambient-right" aria-hidden="true">
          <strong>95%</strong>
          <span>alta aderência</span>
        </div>

        <article className="telegram-window">
          <header className="telegram-window-header">
            <span className="telegram-avatar" aria-hidden="true">JH</span>
            <span className="telegram-sender">
              <strong>JobHunter Bot</strong>
              <small>entrega automática</small>
            </span>
            <time>agora</time>
          </header>

          <div className="telegram-title-row">
            <span className="telegram-match">95% match</span>
            <span className="telegram-profile">Perfil · RH</span>
          </div>

          <h3>Estágio de Recursos Humanos</h3>
          <p className="telegram-company">SOLUTTA · São Paulo · Estágio</p>

          <div className="telegram-explanation">
            <span>POR QUE ESSA VAGA COMBINA</span>
            <p>
              Competências centrais e nível da oportunidade alinhados ao perfil selecionado.
            </p>
          </div>

          <div className="telegram-skills" aria-label="Compatibilidades encontradas">
            {strengths.map((strength) => <span key={strength}>{strength}</span>)}
          </div>

          <footer className="telegram-window-footer">
            <span>Fonte: Catho</span>
            <a href="https://t.me/gutosmboy" target="_blank" rel="noreferrer">
              Conhecer no Telegram <span aria-hidden="true">↗</span>
            </a>
          </footer>
        </article>
      </div>
      <figcaption>
        <span>ENTREGA NA PRÁTICA</span>
        Visual inspirado nas mensagens reais enviadas pelo JobHunter.
      </figcaption>
    </figure>
  );
}
