import express from "express"
import { getAuditReport } from "../services/auditService.js"
import { updateSection } from "../utils/localStore.js"

const router = express.Router()

router.post("/", async (request, response) => {
  try {
    const { website } = request.body
    const auditData = await getAuditReport(website)
    updateSection("audit", auditData)
    response.json(auditData)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

export default router
