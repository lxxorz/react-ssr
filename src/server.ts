import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { build as esbuild } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { logger } from 'hono/logger';
import { serveStatic } from '@hono/node-server/serve-static';
import { createElement } from 'react';
import { parse } from 'es-module-lexer';
import path, { relative } from "node:path"
import fs from "node:fs"
// @ts-ignore
import * as ReactServerDom from 'react-server-dom-webpack/server.browser';


const appDir = new URL('./app/', import.meta.url);
const buildDir = new URL('./build/', import.meta.url);
const reactComponentRegex = /^\./;
const clientEntryPoints = new Set<string>()
const clientComponents: Record<string, {
  id: string,
  name: string,
  chunks: string[],
  async: boolean
}> = {}

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

  const stream = await ReactServerDom.renderToReadableStream(comp, clientComponents)

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
    entryPoints: [resolveApp('page.tsx')],
    outdir: resolveBuild(),
    packages: 'external',
    plugins: [
      {
        name: "resolve-client-import",
        setup(build) {
          build.onResolve({
            filter: reactComponentRegex,
          }, async ({ path: relativePath }) => {

            console.log("Resolving", relativePath)
            const resolved_path = resolveApp(relativePath + ".tsx");

            const content = fs.readFileSync(resolved_path, "utf-8")

            if (content.includes("use client")) {
              clientEntryPoints.add(resolved_path);
              return {
                external: true,
                path: relativePath + ".js"
              }
            }
          })
        }
      }
    ]
  })


  const { outputFiles } = await esbuild({
    bundle: true,
    format: 'esm',
    logLevel: 'error',
    entryPoints: [resolveApp('_client.tsx'), ...clientEntryPoints],
    outdir: resolveBuild(),
    splitting: true,
    write: false
  })
  outputFiles.forEach(async (file) => {
    const [, exports] = parse(file.text);
    let newContents = file.text;
    for (const exp of exports) {
      const key = file.path + exp.n;
      clientComponents[key] = {
        id: `/build/${path.relative(resolveBuild(), file.path)}`,
        name: exp.n,
        chunks: [],
        async: true
      }

      newContents += `
${exp.ln}.$$id = ${JSON.stringify(key)};
${exp.ln}.$$typeof = Symbol.for("react.client.reference");
			`;
    }
    fs.writeFileSync(file.path, newContents);
  })
}

const port = 3000

serve({
  fetch: app.fetch,
  port
})



