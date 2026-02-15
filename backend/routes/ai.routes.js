import express from "express"
import { askAi } from "../controllers/ai.controller.js"
import { autheinticateToken } from "../middleware/middleware.js"

const router = express.Router()

router.post("/ask",autheinticateToken,askAi)

export default router