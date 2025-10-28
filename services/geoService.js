import fetch from "node-fetch"
import { normalizeUrl } from "../utils/urlHelper.js"

export const getGeoRanking = async (website, location = "New York") => {
  const apiKey = process.env.SERP_API_KEY
  const normalizedUrl = normalizeUrl(website)
  const domain = normalizedUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "")

  const url = `https://serpapi.com/search.json?engine=google_maps&q=${domain}&location=${encodeURIComponent(location)}&api_key=${apiKey}`
  const response = await fetch(url)
  const data = await response.json()

  const rank =
    data.local_results?.findIndex((result) => result.website?.includes(domain)) + 1 || -1

  return { location, rank, mapsCount: data.local_results?.length || 0 }
}
