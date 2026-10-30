/** Lightweight fallback shown while a lazily-loaded page chunk downloads. */
export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading">
      <span className="page-loader__dot" />
      <span className="page-loader__dot" />
      <span className="page-loader__dot" />
    </div>
  );
}
