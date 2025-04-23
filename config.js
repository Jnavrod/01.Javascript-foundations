const CONFIG = {
    SEPARATOR: ",", // Default separator, can be changed to ";" or "|"
    ERROR_LEVELS: {
        CRITICAL: ["Invalid date", "Invalid ID"],
        WARNING: ["Invalid name"], // Names with lowercase or special characters can be considered warnings
    }
};

module.exports = CONFIG;