import express from "express"
import { getSERPRank } from "../services/serpService.js"
import { updateSection } from "../utils/localStore.js"

const router = express.Router()

router.post("/", async (request, response) => {
  try {
    const { website, keywords, location } = request.body
    const serpData = await getSERPRank(website, keywords, location)
    updateSection("serp", serpData)
    response.json(serpData)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

export default router
