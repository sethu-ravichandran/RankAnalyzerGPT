import express from "express"
import { generateRecommendations } from "../services/recommendationService.js"
import { readData } from "../utils/localStore.js"

const router = express.Router()

router.post("/", async (request, response) => {
  try {
    const combinedData = readData()
    const { serp, audit, geo } = combinedData

    const recommendations = await generateRecommendations(serp, audit, geo)
    response.json(recommendations)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

export default router
