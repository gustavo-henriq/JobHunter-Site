import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

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
  assert.match(html, /64%/);
  assert.match(html, /94,4%/);
  assert.match(html, /100%/);
  assert.match(html, /Do anúncio ao match/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/i);
});

test("ships metadata and the social preview asset", async () => {
  const [layout, page] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    access(new URL("../public/og.png", import.meta.url)),
  ]);

  assert.match(layout, /lang="pt-BR"/);
  assert.match(layout, /images: \[\{ url: "\/og\.png"/);
  assert.match(page, /RESULTADO PRIMEIRO/);
  assert.match(page, /PIPELINE DE DADOS/);
});
