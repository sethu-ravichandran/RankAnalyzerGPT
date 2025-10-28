import fetch from "node-fetch"
import { calculateSEOScore } from "../utils/scoreCalculator.js"
import { normalizeUrl } from "../utils/urlHelper.js"

export const getSERPRank = async (website, keywords = [], location = "us") => {
  const apiKey = process.env.SERP_API_KEY
  const results = []

  // Normalize the website input
  const normalizedUrl = normalizeUrl(website)

  // Extract just the domain name (without protocol or path)
  const domain = normalizedUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .toLowerCase()

  // Ensure keywords is always an array
  const keywordList = Array.isArray(keywords)
    ? keywords
    : keywords.split(",").map(k => k.trim()).filter(Boolean)

  for (const keyword of keywordList) {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(
      keyword
    )}&engine=google&gl=${location}&api_key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    const position =
      data.organic_results?.findIndex(result =>
        result.link?.toLowerCase().includes(domain)
      ) + 1 || -1

    results.push({ keyword, position })
  }

  const seoScore = calculateSEOScore(results)
  return { results, seoScore }
}
