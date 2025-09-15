import express from "express";
import cors from "cors";

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

// In-memory mock data (resets on deploy). Replace with DB later.
const posts = [];

app.get("/healthz", (req, res) => res.status(200).json({ ok: true }));

app.post("/auth/signup", (req, res) => {
  // Mock signup: immediately returns a fake token. Replace later.
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: "email required" });
  return res.json({ id: 1, token: "demo-token" });
});

app.post("/auth/login", (req, res) => {
  return res.json({ token: "demo-token" });
});

app.get("/community/posts", (req, res) => res.json(posts));

app.post("/community/posts", (req, res) => {
  const { title, body } = req.body || {};
  if (!title) return res.status(400).json({ error: "title required" });
  const p = { id: posts.length + 1, title, body: body || "", createdAt: new Date().toISOString() };
  posts.unshift(p);
  res.json(p);
});

app.listen(PORT, () => console.log(`API on :${PORT}`));
