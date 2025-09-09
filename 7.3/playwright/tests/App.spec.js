const { test, expect } = require("@playwright/test");
const { email, password, errorPassword } = require("../user").default;

test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Войти по почте").click();
  await page.locator('input[placeholder="Email"]').click();
  await page.locator('input[placeholder="Email"]').fill(email);
  await page.locator('input[placeholder="Пароль"]').click();
  await page.locator('input[placeholder="Пароль"]').fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByRole("heading", { name: "Моё обучение" })).toBeVisible(
    { timeout: 10000 }
  );
});

test("не успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByText("Войти по почте").click();
  await page.locator('input[placeholder="Email"]').click();
  await page.locator('input[placeholder="Email"]').fill(email);
  await page.locator('input[placeholder="Пароль"]').click();
  await page.locator('input[placeholder="Пароль"]').fill(errorPassword);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toBeVisible();
});
