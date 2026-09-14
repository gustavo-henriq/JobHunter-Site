import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function expectCurrentSite(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Quanto tempo/);
  assert.match(html, /você gasta buscando/);
  assert.match(html, /Entre tantas vagas, existe uma que faz sentido para você/);
  assert.match(html, /Suas metas mudam/);
  assert.match(html, /O JobHunter/);
  assert.match(html, /acompanha/);
  assert.match(html, /Filtros eliminam as vagas que não fazem sentido/);
  assert.match(html, /Chega a oportunidade/);
  assert.match(html, /Menos procurando/);
  assert.match(html, /https:\/\/t\.me\/gutosmboy/);

  assert.doesNotMatch(html, /EVIDÊNCIA ACUMULADA/i);
  assert.doesNotMatch(html, /145 alertas/i);
  assert.doesNotMatch(html, /Do anúncio ao match/i);
  assert.doesNotMatch(html, /Explorar resultados/i);
}

test("renders the approved JobHunter experience at the canonical route", async () => {
  await expectCurrentSite("/");
});

test("keeps the previously shared explore route on the approved experience", async () => {
  await expectCurrentSite("/explorar");
});

test("ships accurate metadata and optimized brand assets", async () => {
  const [layout, rootPage, logo, socialImage] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    stat(new URL("../public/job-hunter-encaixe.png", import.meta.url)),
    stat(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(layout, /lang="pt-BR"/);
  assert.match(layout, /NEXT_PUBLIC_SITE_URL/);
  assert.match(layout, /canonical: "\/"/);
  assert.match(rootPage, /\.\/explorar\/page/);
  assert.ok(logo.size < 20_000, `brand mark is unexpectedly large: ${logo.size}`);
  assert.ok(socialImage.size < 500_000, `social image is unexpectedly large: ${socialImage.size}`);
});
