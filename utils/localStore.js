import fs from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "data.json")


export const readData = () => {
  try {
    if (!fs.existsSync(dataFilePath)) return { serp: {}, audit: {}, geo: {} }
    const raw = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(raw)
  } catch (err) {
    console.error("Error reading data.json:", err)
    return { serp: {}, audit: {}, geo: {} }
  }
}

export const writeData = (newData) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2))
  } catch (err) {
    console.error("Error writing to data.json:", err)
  }
}

export const updateSection = (section, payload) => {
  const current = readData()
  current[section] = payload
  writeData(current)
}
