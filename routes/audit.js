import express from "express"
import { getAuditReport } from "../services/auditService.js"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const { website } = req.body
    const data = await getAuditReport(website)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
