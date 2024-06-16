import { Album } from "./album";
import { Suspense } from "react";
import Loading from "./loading";
export default function Page() {
  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <Suspense fallback={<Loading></Loading>}>
        <Album />
      </Suspense>
    </div>
  );
}
