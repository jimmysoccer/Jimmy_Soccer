export default function Home() {
  return (
    <div className="main-content">
      <div
        className="main-container"
        style={{ textAlign: "center", width: "100%" }}
      >
        <h2>Home page</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div className="main-container" style={{ width: "45%" }}>
          <h2>Blog</h2>
        </div>
        <div className="main-container" style={{ width: "45%" }}>
          <h2>Contact</h2>
        </div>
      </div>
    </div>
  );
}
