import { lazy, Suspense, useEffect, useState } from "react";

const Lottie = lazy(() => import("lottie-react"));

/**
 * Loads lottie-react and the (large) animation JSON on demand, after the
 * page has painted, so they never block the first render.
 * `load` must be a function returning a dynamic import of the JSON.
 */
export default function LazyLottie({
  load,
  className,
  style,
  placeholderHeight = 320,
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    const run = () => load().then((m) => alive && setData(m.default || m));
    const id =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(run, { timeout: 1200 })
        : setTimeout(run, 200);
    return () => {
      alive = false;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [load]);

  const placeholder = (
    <div style={{ minHeight: placeholderHeight }} aria-hidden />
  );
  if (!data) return placeholder;
  return (
    <Suspense fallback={placeholder}>
      <Lottie className={className} style={style} animationData={data} loop />
    </Suspense>
  );
}
