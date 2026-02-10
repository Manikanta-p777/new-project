import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config(); // 🔥 guaranteed

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
});

export default sql;
