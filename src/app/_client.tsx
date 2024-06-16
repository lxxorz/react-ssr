import { createRoot } from "react-dom/client";

// @ts-ignore
import { createFromFetch } from "react-server-dom-webpack/client";

const root = createRoot(document.getElementById("root")!);

// HACK: map webpack resolution to native ESM
// @ts-expect-error Property '__webpack_require__' does not exist on type 'Window & typeof globalThis'.
window.__webpack_require__ = async (id) => {
  return import(id);
};

createFromFetch(fetch("/rsc")).then((comp: any) => {
  root.render(comp);
});
