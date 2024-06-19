import { hydrateRoot } from "react-dom/client";

// @ts-ignore
import Page from "./page";

import { createElement } from "react";

const element = createElement(Page);

// @ts-ignore
hydrateRoot(document!, element);
