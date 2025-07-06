const { updateSheet } = require("../../update-test-result");

(async () => {
    const data = require('../../test-results/e2e-test-results.json');
    await updateSheet(data, {
        columnFind: 'A',
        columnUpdate: 'I',
        columnUpdatedAt: 'J',
        sheetRowStart: 7,
        sheetName: 'Login Tests',
        spreadsheetId: '1PlPzH9QdIIFUpJZ41Qu1sVJF-Y306Z7RU5HsiE7oYIg',
    })
})();