export const normalizeUrl = (website) => {
  if (!website) return ""

  let formatted = website.trim()

  if (!/^http?:\/\//i.test(formatted) && !/^https?:\/\//i.test(formatted)) {
    formatted = "http://" + formatted
  }

  formatted = formatted.replace(/\/+$/, "")

  return formatted
}
