import { Album } from "./album";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html>
      <h1>Pop Music</h1>
      {mounted && (
        <button onClick={() => setCount(count + 1)}>click me {count}</button>
      )}
      <Suspense fallback="loading">
        <Album />
      </Suspense>
    </html>
  );
}
