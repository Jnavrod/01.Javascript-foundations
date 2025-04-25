const fs = require("fs").promises
const path = require("path")

async function readFile(filePath) {
    try {
        const resolvedPath = path.resolve(filePath)
        const content = await fs.readFile(resolvedPath, "utf-8")
        return content.split("\n").map(line => line.trim())
    } catch (error) {
        console.error(`❌ Error reading the file: ${error.message}`)
        return []
    }
}

module.exports = { readFile }