import fetch from "node-fetch"
import { normalizeUrl } from "../utils/urlHelper.js"

export const getAuditReport = async (website) => {
  const apiKey = process.env.PAGESPEED_API_KEY
  const normalizedUrl = normalizeUrl(website)
  console.log(normalizedUrl)

//   const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${normalizedUrl}&strategy=desktop&category=performance&category=seo&category=accessibility&category=best-practices&key=${apiKey}`

  const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${normalizedUrl}&strategy=desktop&category=performance&category=seo&category=accessibility&category=best-practices&fields=lighthouseResult(categories(performance,seo,accessibility,best-practices))&key=${apiKey}`


  const response = await fetch(url)
  const data = await response.json()

  const categories = data.lighthouseResult?.categories || {}

  return {
    performance: categories.performance?.score ? categories.performance.score * 100 : null,
    seo: categories.seo?.score ? categories.seo.score * 100 : null,
    accessibility: categories.accessibility?.score ? categories.accessibility.score * 100 : null,
    bestPractices: categories["best-practices"]?.score ? categories["best-practices"].score * 100 : null
  }
}
