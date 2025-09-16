// CommonJS
const { Pool } = require("pg");

const connStr = process.env.DATABASE_URL;
if (!connStr) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

// If you must use External URL, uncomment next line to force SSL:
// process.env.PGSSLMODE = process.env.PGSSLMODE || "require";

const pool = new Pool({ connectionString: connStr });

module.exports = { pool };
