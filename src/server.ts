import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { build as esbuild } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { logger } from 'hono/logger';
import { serveStatic } from '@hono/node-server/serve-static';
import { createElement } from 'react';

// @ts-ignore
import * as ReactServerDom from 'react-server-dom-webpack/server.browser';


const appDir = new URL('./app/', import.meta.url);
const buildDir = new URL('./build/', import.meta.url);

function resolveApp(path = '') {
  return fileURLToPath(new URL(path, appDir));
}

function resolveBuild(path = '') {
  return fileURLToPath(new URL(path, buildDir));
}

const app = new Hono()

app.use("/build/*", serveStatic({ root: "./src" }))

export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest)
}

app.use(logger(customLogger))

app.get("/", async (c) => {
  await build();

  return c.html(`
    <html>
      <head>
        <title>React Server DOM</title>
      </head>
      <body>
        <div id="root"></div>
         <script src="https://cdn.tailwindcss.com"></script>
        <script type="module" src="./build/_client.js"></script>
      </body>
    </html>
`)
})
app.get('/rsc', async (ctx) => {
  // @ts-ignore
  const Page = (await import("./build/page.js")).default;

  // @ts-ignore
  const comp = createElement(Page)

  const stream = await ReactServerDom.renderToReadableStream(comp)

  return new Response(stream, {
    "headers": {
      "Content-Type": "text/html",
      "Transfer-Encoding": "chunked"
    }
  })
})

async function build() {
  await esbuild({
    bundle: true,
    format: 'esm',
    logLevel: 'error',
    jsx: "transform",
    entryPoints: [resolveApp('page.tsx')],
    outdir: resolveBuild(),
    packages: 'external',
  })

  await esbuild({
    bundle: true,
    format: 'esm',
    logLevel: 'error',
    jsx: "transform",
    entryPoints: [resolveApp('_client.tsx')],
    outdir: resolveBuild(),
  })
}

const port = 3000

serve({
  fetch: app.fetch,
  port
})



