import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import sql from "./db.js";
import authRoutes from "./routes/auth.routes.js"
import aiRoutes from "./routes/ai.routes.js"
import coursesRoutes from "./routes/courses.route.js"

const app = express();
app.use(express.json());
app.use(cors())

// test DB
await sql`SELECT 1`;
console.log("Database connected ✅");

// connect auth routes
app.use("/auth", authRoutes);
app.use("/ai",aiRoutes);
app.use("/api",coursesRoutes);

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
