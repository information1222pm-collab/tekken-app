import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export default function App() {
  const [health, setHealth] = useState("checking…");
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API}/healthz`).then(r => r.ok ? "ok" : "down").then(setHealth).catch(() => setHealth("down"));
    fetch(`${API}/community/posts`).then(r=>r.json()).then(setPosts).catch(()=>{});
  }, []);

  const submit = async () => {
    const res = await fetch(`${API}/community/posts`, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ title, body: "Created from SPA" })
    });
    const json = await res.json();
    setPosts(p => [json, ...p]);
    setTitle("");
  };

  return (
    <div style={{fontFamily:"system-ui, sans-serif", color:"#e6edf7", background:"#0b0f17", minHeight:"100vh", padding:"16px"}}>
      <h1 style={{margin:"0 0 12px"}}>Tekken Mentor</h1>
      <div style={{opacity:.8, marginBottom:12}}>API health: <b>{health}</b> @ {API}</div>

      <div style={{display:"grid", gap:12}}>
        <div style={{background:"#121826", padding:12, borderRadius:12}}>
          <div style={{marginBottom:8}}>Create Community Post</div>
          <input
            value={title}
            placeholder="Post title"
            onChange={e=>setTitle(e.target.value)}
            style={{width:"100%", padding:"8px", borderRadius:8, border:"1px solid #23314f", background:"#0f172a", color:"#e6edf7"}} />
          <button onClick={submit} style={{marginTop:8, padding:"8px 12px", borderRadius:10, border:"1px solid #23314f", background:"#0f172a", color:"#6ee7ff"}}>
            Submit
          </button>
        </div>

        <div style={{background:"#121826", padding:12, borderRadius:12}}>
          <div style={{marginBottom:8}}>Latest Posts</div>
          {posts.length === 0 && <div style={{opacity:.7}}>No posts yet.</div>}
          {posts.map(p => (
            <div key={p.id} style={{padding:"8px 0", borderTop:"1px solid #23314f"}}>
              <div style={{fontWeight:600}}>{p.title}</div>
              <div style={{opacity:.7, fontSize:12}}>{p.createdAt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
