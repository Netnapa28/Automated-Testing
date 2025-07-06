import { expect } from '@playwright/test';
import { test } from '../pages/base';
import { invalidUsers, validUsers } from '../test-data/user';

/*
//กรณีไม่ใช้ , async ({ page }) ของ playwright
//Setup Open browser
let browser
let page
test.beforeAll(async ()=> {
  browser = await chromium.launch();
  page = await browser.newPage();
});

//Teardown Close browser
test.afterAll(async ()=> {
  browser.close();
});
*/

/*
//เเบบเต็มไม่ได้สร้างฟังก์ชันเเล้วดึงมาใช้
test('Input fields should display as the data that was filled', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('testuser');     // # ตามด้วยชื่อ id ของช่องนั้น id="user-name"
  expect(await page.locator('#user-name').inputValue()).toBe('testuser');     //ดึงค่า input ออกมาตรวจสอบ ว่าตรงกันไหม(.toBe)

  await page.locator('#password').fill('password');
  expect(await page.locator('#password').inputValue()).toBe('password');
});*/

test.describe('LOGIN FUNCTION', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();      //ฟังก์ชัน goto
  });

  // ค่าที่กรอกตรงกับค่าที่ออกมาไหม
  test(`TC-001: Input fields should display as the data that was filled`, async ({ loginPage }) => {
    await loginPage.fillUserPassword('testuser', 'password');

    expect(await loginPage.getUsername()).toBe('testuser');     //ดึงค่า input ออกมาตรวจสอบ ว่าตรงกันไหม(.toBe)
    expect(await loginPage.getPassword()).toBe('password');
  });

  // ไม่ใส่ username
  test(`TC-002: Should show an error message if attempting to log in without a username`, async ({ loginPage }) => {
    await loginPage.fillUserPassword('', 'password');
    await loginPage.clickLogin();     //ฟังก์ชัน clickLogin

    expect(await loginPage.getErrorMessage()).toContain('is required');
    expect(await loginPage.isValidUrl()).toBe(true);     //ฟังก์ชัน isValidUrl
  });

  // ไม่ใส่ password
  test(`TC-003: Should show an error message if attempting to log in without a password`, async ({ loginPage }) => {
    await loginPage.fillUserPassword('testuser', '');
    await loginPage.clickLogin();

    expect(await loginPage.getErrorMessage()).toContain('is required');
    expect(await loginPage.isValidUrl()).toBe(true);
  });

  // ไม่ใส่ username, password
  test(`TC-004: Should show an error message if attempting to log in with both fields blank`, async ({ loginPage }) => {
    await loginPage.fillUserPassword('', '');
    await loginPage.clickLogin();

    expect(await loginPage.getErrorMessage()).toContain('is required');
    expect(await loginPage.isValidUrl()).toBe(true);
  });


  // loop ทดสอบ user ที่ login ได้ (ใส่ username, password ครบ)
  validUsers.forEach(({ username, password }) => {
    test(`TC-005: Should should logged in successfully with valid credentials:"${username}"`, async ({ loginPage }) => {
      await loginPage.fillUserPassword(username, password);
      await loginPage.clickLogin();

      expect(await loginPage.getErrorMessage()).not.toContain('is required');     //ไม่มี message
      expect(await loginPage.isValidUrl()).toBe(false);     //ไปหน้าอื่น(จะเป็น url หน้าถัดไป)
    });
  });

  // loop ทดสอบ user ที่ login ไม่ได้ (ใส่ username, password ครบ)
  invalidUsers.forEach(({ username, password }) => {
    test(`TC-006: Should logged in fails with a error message when using locked credentials:"${username}"`, async ({ loginPage }) => {
      await loginPage.fillUserPassword(username, password);
      await loginPage.clickLogin();

      expect(await loginPage.getErrorMessage()).toContain('Epic sadface');     //มี message
      expect(await loginPage.isValidUrl()).toBe(true);     //อยู่หน้าเดิม
    });
  });
});