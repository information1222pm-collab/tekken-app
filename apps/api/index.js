// CommonJS version for maximum compatibility on Render
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const ORIGINS = (process.env.CORS_ORIGINS || "").split(",").filter(Boolean);

app.use(express.json());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ORIGINS.length === 0 || ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("CORS blocked"), false);
  }
}));

app.get("/healthz", (_req, res) => res.status(200).json({ ok: true }));

// simple in-memory posts
const posts = [];
app.get("/community/posts", (_req, res) => res.json(posts));
app.post("/community/posts", (req, res) => {
  const { title, body } = req.body || {};
  if (!title) return res.status(400).json({ error: "title required" });
  const p = { id: posts.length + 1, title, body: body || "", createdAt: new Date().toISOString() };
  posts.unshift(p);
  res.json(p);
});

app.listen(PORT, () => console.log(`API listening on :${PORT}`));
