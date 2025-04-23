const { readFile } = require("./reader");
const { verifyLine } = require("./verifiers");
const { saveReport } = require("./report");
const CONFIG = require("./config");

// Get the file name from command-line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("❌ You must provide a file name.");
    process.exit(1);
}

const fileName = args[0];

async function processFile() {
    const lines = await readFile(fileName);
    if (lines.length === 0) {
        console.error("❌ The file is empty or could not be read.");
        process.exit(1);
    }

    const summary = {
        file: fileName,
        separator: CONFIG.SEPARATOR,
        totalLines: lines.length,
        validLines: 0,
        errorLines: 0,
        warnings: 0,
        uniqueErrors: new Set(),
        errors: [],
    };

    lines.forEach((line, index) => {
        const result = verifyLine(line);
        if (result.errors) {
            summary.errorLines++;
            summary.errors.push({ line: index + 1, details: result.errors, severity: result.severity });
            if (result.severity === "WARNING") summary.warnings++;
            result.errors.forEach(error => summary.uniqueErrors.add(error));
        } else {
            summary.validLines++;
        }
    });

    summary.uniqueErrors = Array.from(summary.uniqueErrors);

    console.log(`📂 File: ${fileName} (Separator: ${CONFIG.SEPARATOR})`);
    console.log(`Total lines: ${summary.totalLines}`);
    console.log(`Valid lines: ${summary.validLines}`);
    console.log(`Lines with errors: ${summary.errorLines}`);
    console.log(`Warnings detected: ${summary.warnings}`);

    if (summary.errors.length > 0) {
        console.log("\nDetected errors:");
        summary.errors.forEach(error =>
            console.log(`- Line ${error.line}: ${error.details.join(", ")} [${error.severity}]`)
        );
    }

    await saveReport(summary);
}

processFile();