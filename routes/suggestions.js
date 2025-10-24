import express from "express"
import { generateRecommendations } from "../services/recommendationService.js"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const { serp, audit, geo } = req.body
    const data = await generateRecommendations(serp, audit, geo)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
