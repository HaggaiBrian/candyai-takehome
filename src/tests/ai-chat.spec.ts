import { expect, test } from '@playwright/test';
import LOGIN from '../../src/helpers/paths';
import { clickCloseIfVisible, enterAccessKeyIfVisibleAndSubmit } from '../helpers/key-access';
import { ask, typeMessage } from '../helpers/send-chat';
import homePageSelectors from '../page-objects/home-page';
import landingPageSelectors from '../page-objects/landing-page';
import loginPageModalSelectors from '../page-objects/login-page';

test.describe('Login as premium user and navigate to chat', () => {
  const { loginBtn } = landingPageSelectors.fixedTopBar;
  const { emailTextBox, passwordTextBox, signinBtn } = loginPageModalSelectors.loginPage;
  const { chatBtn } = homePageSelectors.leftFixedDateBar;
  const accessKey = process.env.ACCESS_KEY!;
  const email = process.env.EMAIL!;
  const password = process.env.PASSWORD!;

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN.LOGIN);
    await enterAccessKeyIfVisibleAndSubmit(page, accessKey);
    await page.waitForLoadState('networkidle');
    await page.getByText(loginBtn).click();
    await page.getByRole('textbox', emailTextBox).fill(email);
    await page.getByRole('textbox', passwordTextBox).fill(password);
    await page.getByRole('button', signinBtn).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('link', chatBtn).first()).toBeVisible();
    await page.getByRole('link', chatBtn).first().click();
    await page.waitForLoadState('networkidle');
    await clickCloseIfVisible(page);
  });

  test.only('TC_AIChat_001_SendAndReceiveMessage', async ({ page }) => {
  test.setTimeout(90000);
  const responseText = await typeMessage(page);
  expect(responseText, 'AI response should exist').toBeTruthy();
  expect(responseText.trim().length).toBeGreaterThan(0);
  expect(responseText).toMatch(/[a-zA-Z]+/);
});

  test('TC_AIChat_002_SendAndReceiveMessageUsingAsk', async ({ page }) => {
  await ask(page);
  const generatedImage = page.locator('img[src*="data:image"]');
  await expect(generatedImage).toBeVisible({ timeout: 30000 });
  const createAIVideoOption = page.getByText('Create AI video', { exact: false });
  await expect(createAIVideoOption).toBeVisible({ timeout: 50000 });
});
});
