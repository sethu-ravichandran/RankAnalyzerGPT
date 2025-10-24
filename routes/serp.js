import express from "express"
import { getSERPRank } from "../services/serpService.js"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const { website, keywords, location } = req.body
    const data = await getSERPRank(website, keywords, location)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
