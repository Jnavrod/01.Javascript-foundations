const CONFIG = require("./config")

function isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) return false

    const [year, month, day] = date.split("-").map(Number)
    if (month < 1 || month > 12 || day < 1 || day > 31) return false

    const parsedDate = new Date(year, month - 1, day)

    return parsedDate.getFullYear() === year &&
    parsedDate.getMonth() + 1 === month &&
    parsedDate.getDate() === day
}

function isValidName(name) {
    return typeof name === "string" && name.trim().length > 0 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)
}

function isValidID(id) {
    return /^\d+$/.test(id) && parseInt(id, 10) > 0
}

function verifyLine(line) {
    const parts = line.split(CONFIG.SEPARATOR).map(item => item.trim())
    if (parts.length !== 3) return { errors: ["Invalid format"], severity: "CRITICAL", criticalCount: 1, warningCount: 0 }

    const [date, name, id] = parts
    const errors = []

    let criticalCount = 0
    let warningCount = 0

    const validateError = (condition, errorMessage) => {
        if (condition) {
            errors.push(errorMessage)
            CONFIG.ERROR_LEVELS.CRITICAL.includes(errorMessage) ? criticalCount++ : warningCount++
        }
    }

    validateError(!isValidDate(date), "Invalid date")
    validateError(!isValidName(name), "Invalid name")
    validateError(!isValidID(id), "Invalid ID")

    const severity = criticalCount > 0 ? "CRITICAL" : "WARNING"

    return errors.length > 0 ? { errors, severity, criticalCount, warningCount } : { valid: true }
}

module.exports = { isValidDate, isValidName, isValidID, verifyLine }