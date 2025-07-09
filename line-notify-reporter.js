const sendLineMessage = require('./line-message');

class LineNotifyReporter {
  async onTestEnd(test, result) {
    if (result.status === 'failed') {
      const msg = `❌ Test failed: ${test.title}`;
      await sendLineMessage(msg);
    }
  }
}

module.exports = LineNotifyReporter;
