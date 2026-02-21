import express from "express"
import { getcourses } from "../controllers/coursesController.js";
import { autheinticateToken } from "../middleware/middleware.js";

const router = express.Router();

router.get("/courses",autheinticateToken,getcourses);

export default router;