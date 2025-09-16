const { pool } = require("./db");

const SQL = `
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body  TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
`;

(async () => {
  try {
    await pool.query(SQL);
    console.log("✅ Migration complete");
    process.exit(0);
  } catch (e) {
    console.error("❌ Migration failed:", e);
    process.exit(1);
  }
})();
