import express from "express"
import dotenv from "dotenv"
import serpRouter from "./routes/serp.js"
import auditRouter from "./routes/audit.js"
import geoRouter from "./routes/geo.js"
import suggestionRouter from "./routes/suggestions.js"

dotenv.config()
const app = express()
app.use(express.json())

app.use("/api/v1/serp", serpRouter)
app.use("/api/v1/audit", auditRouter)
app.use("/api/v1/geo", geoRouter)
app.use("/api/v1/suggestions", suggestionRouter)

app.get("/", (request, response) => response.send("SEO Rank Analyzer API Running"))
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
