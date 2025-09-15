// apps/web/src/App.jsx
import React, { useEffect, useState } from "react";

export default function App() {
  const [health, setHealth] = useState("checking...");
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:3000";

  useEffect(() => {
    fetch(`${apiBase}/healthz`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setHealth(`ok @ ${apiBase}`))
      .catch((err) => setHealth(`down @ ${apiBase}`));
  }, [apiBase]);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Tekken Mentor</h1>
      <p>API health: {health}</p>
      <p>
        <a href="https://tekkenmentor.com">Visit tekkenmentor.com</a>
      </p>
    </div>
  );
}
