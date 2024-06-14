import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { Readable, Transform } from 'node:stream';
import { build as esbuild } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { logger } from 'hono/logger';

import { createElement } from 'react';


import { renderToPipeableStream } from "react-dom/server"
import { BodyData } from 'hono/utils/body';


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

  // const pipe_stream = await ReactServerDom.renderToReadableStream(createElement(Page, { name: 'world' }))

  const transform = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString())
      console.log("Chunked: ", chunk.toString())
      callback();
    },
  })

  transform.on("close", () => {
    console.log("closed")
  })

  // @ts-ignore
  const comp = createElement(Page);

  // @ts-ignore
  const { pipe } = renderToPipeableStream(comp, {
    bootstrapScripts: [],

    // for streaming
    onShellReady() {
      pipe(transform)
    },

    // for static site generation
    // onAllReady() {
    //   pipe(transform)
    // },
    onShellError(error) {
      console.error(error)
    },

    onError(error) {
      console.error(error)
    }
  })

  const stream = Readable.toWeb(transform) as ReadableStream<BodyData>;

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



