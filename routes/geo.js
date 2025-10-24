import express from "express"
import { getGeoRanking } from "../services/geoService.js"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const { website, location } = req.body
    const data = await getGeoRanking(website, location)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
