import { createRoot } from "react-dom/client";

// @ts-ignore
import { createFromFetch } from "react-server-dom-webpack/client";

const root = createRoot(document.getElementById("root")!);

createFromFetch(fetch("/rsc")).then((comp: any) => {
  root.render(comp);
});
