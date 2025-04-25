# 01.Javascript-foundations (File validator)

This project evaluates the information inside each file, in this case, it considers a separator and 3 aspects: date, name and ID
After processing information, it generates a report in json format for the last verification.

# Modules structure

📂 validator.js
|-- 📂 config.js  -> It can be setted with a specfic separator
|-- 📂 reader.js  -> This file allows to read and format lines and simple formatting lines
|-- 📂 verifiers.js  -> It containes the main verificators to validate dates, names, and id
|-- 📂 report.js  -> It rewrites the file output.json with the last verification

# Test files

|-- 📂 test1.js  -> It contains correct and invalid lines
|-- 📂 test2.js  -> It contains only invalid data
|-- 📂 test3.js  -> It's just a blank file
