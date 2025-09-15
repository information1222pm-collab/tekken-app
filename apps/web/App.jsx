import React, { useEffect, useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("booting…");
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:3000";

  // Error boundary-ish: if something throws, we still render text
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${apiBase}/healthz`, { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setMsg(`API health: ok @ ${apiBase}`);
      } catch (e) {
        setMsg(`API health: down @ ${apiBase}`);
      }
    })();
  }, [apiBase]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>Tekken Mentor</h1>
      <p>{msg}</p>
      <p style={{opacity:.6,fontSize:12}}>If this says localhost, redeploy with Vercel env VITE_API_BASE.</p>
    </div>
  );
}
