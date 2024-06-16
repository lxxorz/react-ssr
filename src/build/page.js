// src/app/album.tsx
import { jsx, jsxs } from "react/jsx-runtime";
async function Album() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/albums/1/photos"
  );
  const photos = await response.json();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-bold text-lg", children: "Album" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: photos.map((photo) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-center", children: photo.title }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: photo.thumbnailUrl,
          alt: photo.title,
          className: "w-48 h-48 object-cover rounded-lg shadow-lg"
        }
      )
    ] }, photo.id)) })
  ] });
}

// src/app/page.tsx
import { Suspense } from "react";

// src/app/loading.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Loading() {
  return /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx2("h1", { className: "font-bold text-lg", children: "Loading..." }),
    /* @__PURE__ */ jsx2("div", { className: "animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" })
  ] });
}

// src/app/page.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Page() {
  return /* @__PURE__ */ jsx3("div", { className: "container mx-auto min-h-screen flex justify-center items-center", children: /* @__PURE__ */ jsx3(Suspense, { fallback: /* @__PURE__ */ jsx3(Loading, {}), children: /* @__PURE__ */ jsx3(Album, {}) }) });
}
export {
  Page as default
};
