import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(pathname = "/") {
  const worker = await loadWorker();
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Motz home page and quote form", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Motz Turf Farms \| Cincinnati Sod &amp; Turf Experts<\/title>/i);
  assert.match(html, /Great lawns[\s\S]*start here\./i);
  assert.match(html, /<form\b/i);
  assert.match(html, /name="firstName"/i);
  assert.match(html, /name="projectSize"/i);
  assert.match(html, /513 231 4844/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/i);
});

test("server-renders the privacy page", async () => {
  const response = await render("/privacy");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Privacy Policy/i);
});

test("quote API rejects incomplete requests without attempting delivery", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/api/quote", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ firstName: "Test" }),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Please complete every required field." });
});

test("quote API keeps the production delivery fallback", async () => {
  const source = await readFile(new URL("../app/api/quote/route.ts", import.meta.url), "utf8");
  assert.match(source, /motz-turf-farm\.motzturffarm\.workers\.dev\/api\/quote/);
  assert.match(source, /deliveryResponse\.status/);
  assert.match(source, /Please call 513-231-4844/);
});
