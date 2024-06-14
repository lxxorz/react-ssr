import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { build as esbuild } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { logger } from 'hono/logger';
import { ReactNode, createElement } from 'react';
import { serveStatic } from '@hono/node-server/serve-static';
// import * as ReactServerDom from 'react-server-dom-webpack/server.browser';
import { readFile, writeFile } from 'node:fs/promises';
// import { parse } from 'es-module-lexer';
import { relative } from 'node:path';

import { renderToString } from "react-dom/server"
import { hydrateRoot } from 'react-dom/client';


const appDir = new URL('./app/', import.meta.url);
const buildDir = new URL('./build/', import.meta.url);

function resolveApp(path = '') {
  return fileURLToPath(new URL(path, appDir));
}

function resolveBuild(path = '') {
  return fileURLToPath(new URL(path, buildDir));
}

const app = new Hono()

export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest)
}

app.use(logger(customLogger))

app.get('/', async (ctx) => {
  await build();

  // @ts-ignore
  const Page = (await import("./build/page.js")).default;
  // @ts-ignore
  const html = renderToString(createElement(Page));
  return ctx.html(html)
})

async function build() {
  await esbuild({
    bundle: true,
    format: 'esm',
    logLevel: 'error',
    jsx: "transform",
    entryPoints: [resolveApp('page.jsx')],
    outdir: resolveBuild(),
    packages: 'external',
  })
}

const port = 3000

serve({
  fetch: app.fetch,
  port
})



