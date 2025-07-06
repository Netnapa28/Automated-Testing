# Automated Testing with Playwright and Google Sheets Integration

## 🌐 Tested Website
- [https://www.saucedemo.com/](https://www.saucedemo.com/)

## 📊 Google Sheet for Test Results
- [Google Sheet Link](https://docs.google.com/spreadsheets/d/1PlPzH9QdIIFUpJZ41Qu1sVJF-Y306Z7RU5HsiE7oYIg/edit?gid=0#gid=0)

---

## ⚙️ Setup Instructions

### 1. Initialize Playwright and Install Dependencies
```bash
npm init playwright@latest
npx playwright install

# Install Google APIs client
npm install googleapis
````

### 2. Running Tests

* **Run tests only:**

```bash
npx playwright test
```

* **Run tests and update results to Google Sheet:**

```bash
npm run test
```

### 3. Viewing Test Reports

```bash
npx playwright show-report
```