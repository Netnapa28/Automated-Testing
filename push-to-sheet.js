const { updateSheet } = require("./update-test-result");
const data = require("./test-results/e2e-test-results.json");

(async () => {
  await updateSheet(data, {
    spreadsheetId: '1PlPzH9QdIIFUpJZ41Qu1sVJF-Y306Z7RU5HsiE7oYIg',   // Url Google Sheet
    sheetName: 'Login Tests',      // ชื่อแผ่นงานด้านล่างใน Google Sheet 
    columnFind: 'A',               // ค้นหา
    columnUpdate: 'I',             // เเสดงผลการรันที่ column I 
    columnUpdatedAt: 'J',          // เเสดงผลเวลารันที่ column J
    sheetRowStart: 6,              // เริ่มที่ column 6
  });
})();