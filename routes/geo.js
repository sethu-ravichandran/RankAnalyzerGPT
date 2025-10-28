import express from "express"
import { getGeoRanking } from "../services/geoService.js"
import { updateSection } from "../utils/localStore.js"

const router = express.Router()

router.post("/", async (request, response) => {
  try {
    const { website, location } = request.body
    const geoData = await getGeoRanking(website, location)
    updateSection("geo", geoData)
    response.json(geoData)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

export default router
