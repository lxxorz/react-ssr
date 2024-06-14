// src/app/album.tsx
import { jsx, jsxs } from "react/jsx-runtime";
async function Album() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 2e3));
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Albums" }),
    /* @__PURE__ */ jsx("ul", { children: albums.map((album) => /* @__PURE__ */ jsx("li", { children: album.title }, album.id)) })
  ] });
}

// src/app/page.tsx
import { Suspense } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Page() {
  return /* @__PURE__ */ jsxs2("html", { children: [
    /* @__PURE__ */ jsx2("h1", { children: "Pop Music" }),
    /* @__PURE__ */ jsx2("input", { type: "text" }),
    /* @__PURE__ */ jsx2(Suspense, { fallback: "loading", children: /* @__PURE__ */ jsx2(Album, {}) })
  ] });
}
export {
  Page as default
};
