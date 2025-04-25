const fs = require("fs").promises
const path = require("path")

async function saveReport(reportData) {
    const outputPath = path.resolve("output.json")
    try {
        await fs.writeFile(outputPath, JSON.stringify(reportData, null, 2), "utf-8")
        console.log(`✅ Report successfully saved to ${outputPath}`)
    } catch (error) {
        console.error(`❌ Failed to save report: ${error.message}`)
    }
}

module.exports = { saveReport }