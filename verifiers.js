const CONFIG = require("./config");

function isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;

    const [year, month, day] = date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.getFullYear() === year && dateObj.getMonth() + 1 === month && dateObj.getDate() === day;
}

function isValidName(name) {
    return typeof name === "string" && name.trim().length > 0 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
}

function isValidID(id) {
    return /^\d+$/.test(id) && parseInt(id, 10) > 0;
}

function verifyLine(line) {
    const parts = line.split(CONFIG.SEPARATOR);
    if (parts.length !== 3) return { errors: ["Invalid format"], severity: "CRITICAL" };

    const [date, name, id] = parts.map(item => item.trim());

    const errors = [];
    if (!isValidDate(date)) errors.push("Invalid date");
    if (!isValidName(name)) errors.push("Invalid name");
    if (!isValidID(id)) errors.push("Invalid ID");

    const severity = errors.some(err => CONFIG.ERROR_LEVELS.CRITICAL.includes(err))
        ? "CRITICAL"
        : "WARNING";

    return errors.length > 0 ? { errors, severity } : { valid: true };
}

module.exports = { isValidDate, isValidName, isValidID, verifyLine };