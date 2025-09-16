const express = require("express");
const cors = require("cors");
const { pool } = require("./db");

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

// Create post
app.post("/community/posts", async (req, res) => {
  try {
    const { title, body } = req.body || {};
    if (!title) return res.status(400).json({ error: "title required" });
    const q = await pool.query(
      "INSERT INTO posts(title, body) VALUES ($1, $2) RETURNING id, title, body, created_at",
      [title, body || ""]
    );
    res.json(q.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server_error" });
  }
});

// List posts (latest first)
app.get("/community/posts", async (_req, res) => {
  try {
    const q = await pool.query(
      "SELECT id, title, body, created_at FROM posts ORDER BY created_at DESC LIMIT 100"
    );
    res.json(q.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server_error" });
  }
});

app.listen(PORT, () => console.log(`API listening on :${PORT}`));
