import { Album } from "./album";
import { Suspense } from "react";
export default function Page() {
  return (
    <html>
      <h1>Pop Music</h1>

      <input type="text" />

      <Suspense fallback="loading">
        <Album />
      </Suspense>
    </html>
  );
}
