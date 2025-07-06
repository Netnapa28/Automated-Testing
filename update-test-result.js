const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({
    keyFile: "credential.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

async function updateSheet(data, config) {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const {
        spreadsheetId, sheetName,
        columnFind = 'A', columnUpdate = 'I', columnUpdatedAt = 'J',
        sheetRowStart = 7,
    } = config;

    const findCol = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!${columnFind}${sheetRowStart}:${columnFind}`
    });

    const rows = findCol.data.values || [];

    // ✅ เก็บผลรวมตาม TC-ID
    const tcResults = {}; // { 'TC-001': [true], 'TC-005': [true, true, false], ... }

    for (const suite of data.suites || []) {
        for (const group of suite.suites || []) {
            for (const spec of group.specs || []) {
                const title = spec.title;
                const isPassed = spec.ok;

                const matchedTcId = title.match(/TC-\d{3}/)?.[0];
                if (!matchedTcId) continue;

                if (!tcResults[matchedTcId]) {
                    tcResults[matchedTcId] = [];
                }
                tcResults[matchedTcId].push(isPassed);
            }
        }
    }

    // ✅ สรุปผลแต่ละ TC ว่า Pass/Fail
    let updatedCount = 0;
    for (const [tcId, results] of Object.entries(tcResults)) {
        const isAllPassed = results.every(r => r); // ถ้ามี false ตัวเดียวจะ Fail

        const index = rows.findIndex(row => row[0]?.trim() === tcId);
        if (index !== -1) {
            const rowNum = sheetRowStart + index;

            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `${sheetName}!${columnUpdate}${rowNum}`,
                valueInputOption: "RAW",
                resource: { values: [[isAllPassed ? 'Pass' : 'Fail']] }
            });

            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: `${sheetName}!${columnUpdatedAt}${rowNum}`,
                valueInputOption: "RAW",
                resource: { values: [[new Date().toLocaleString()]] }
            });

            updatedCount++;
        }
    }

    console.log(`✅ Updated ${updatedCount} record(s) on Google Sheet`);
}

module.exports = { updateSheet };
