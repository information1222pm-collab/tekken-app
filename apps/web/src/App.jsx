import React, { useEffect, useState } from "react";

export default function App() {
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const [status, setStatus] = useState("checking…");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${apiBase}/healthz`, { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setStatus(`ok @ ${apiBase}`);
      } catch {
        setStatus(`down @ ${apiBase}`);
      }
    })();
  }, [apiBase]);

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f17", color: "#e6edf7", fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Tekken Mentor</h1>
      <p>API health: {status}</p>
      <p style={{ opacity: .7, fontSize: 12 }}>
        If this shows <code>localhost</code>, set Vercel env <code>VITE_API_BASE</code> and redeploy.
      </p>
    </div>
  );
}
