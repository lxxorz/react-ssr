// src/app/page.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Page() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Hello World!" }),
    /* @__PURE__ */ jsx("p", { children: "It's a page!" }),
    /* @__PURE__ */ jsxs("table", { children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Location" }),
        /* @__PURE__ */ jsx("th", { children: "Path" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "Home" }),
          /* @__PURE__ */ jsx("td", { children: "/" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "Page" }),
          /* @__PURE__ */ jsx("td", { children: "/page" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "404" }),
          /* @__PURE__ */ jsx("td", { children: "/404" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Page as default
};
