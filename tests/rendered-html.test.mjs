import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the complete JobHunter page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>JobHunter — Vagas certas, antes do ruído<\/title>/i);
  assert.match(html, /Quanto tempo você gasta buscando/);
  assert.match(html, /oportunidades/);
  assert.doesNotMatch(html, /443|350|25 de 443/);
  assert.match(html, /82%/);
  assert.match(html, /145/);
  assert.match(html, /74/);
  assert.match(html, /71/);
  assert.match(html, /78%/);
  assert.match(html, /−42%/);
  assert.match(html, /Só o que faz sentido avança/i);
  assert.match(html, /menos chamadas repetidas à IA/i);
  assert.doesNotMatch(html, /528|92 seguiram|53 de 68|5min27s|3min10s/i);
  assert.doesNotMatch(html, /34 execuções|51% do histórico|49% do histórico|133 entregas|Outras 12/i);
  assert.match(html, /https:\/\/t\.me\/gutosmboy/);
  assert.doesNotMatch(html, /0% de reprocessamento/i);
  assert.doesNotMatch(html, /sem falhas ou timeouts/i);
  assert.match(html, /PERFIS MODULARES/);
  assert.match(html, /Suas metas/);
  assert.match(html, /mudam\. O JobHunter/);
  assert.match(html, /JobHunter/);
  assert.match(html, /acompanha/);
  assert.match(html, /Cada perfil combina currículo, critérios e fontes/);
  assert.match(html, /Conteúdo · SEO · CRM/);
  assert.match(html, /Analista de Marketing Jr/);
  assert.match(html, /ENTREGA NA VIDA REAL/);
  assert.match(html, /ENTREGA NA PRÁTICA/);
  assert.match(html, /Estágio de Recursos Humanos/);
  assert.match(html, /95% match/);
  assert.match(html, /Cenários ilustrativos — não representam vagas abertas/);
  assert.doesNotMatch(html, /vagas de tecnologia|portais de tecnologia/i);
  assert.match(html, /Do anúncio ao match/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("ships metadata and the social preview asset", async () => {
  const [layout, page, telegramDelivery] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/TelegramDelivery.tsx", import.meta.url), "utf8"),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/jobhunter-delivery-atmosphere-green-v2.png", import.meta.url)),
  ]);

  assert.match(layout, /lang="pt-BR"/);
  assert.match(layout, /images: \[\{ url: "\/og\.png"/);
  assert.match(page, /EVIDÊNCIA ACUMULADA/);
  assert.match(page, /PIPELINE DE DADOS/);
  assert.match(page, /MotionEffects/);
  assert.match(page, /data-reveal/);
  assert.match(page, /href="https:\/\/t\.me\/gutosmboy"/);
  assert.match(telegramDelivery, /href="https:\/\/t\.me\/gutosmboy"/);
});
