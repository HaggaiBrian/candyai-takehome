import { expect, test } from '@playwright/test';

import LOGIN from '../../src/helpers/paths';
import { clickCloseIfVisible, enterAccessKeyIfVisibleAndSubmit } from '../helpers/key-access';
import { placeCall, typeMessage } from '../helpers/send-chat';
import chatPageSelectors from '../page-objects/chat-page';
import homePageSelectors from '../page-objects/home-page';
import landingPageSelectors from '../page-objects/landing-page';
import loginPageModalSelectors from '../page-objects/login-page';

test.describe('Login as premium user and navigate to chat', () => {
  // Extracting selectors for easier reuse
  const { loginBtn } = landingPageSelectors.fixedTopBar;
  const { emailTextBox, passwordTextBox, signinBtn } = loginPageModalSelectors.loginPage;
  const { ringingText, hangUpBtn } = chatPageSelectors.callSection;
  const { chatBtn } = homePageSelectors.leftFixedDateBar;

  // Environment variables for secure credentials
  const accessKey = process.env.ACCESS_KEY!;
  const email = process.env.EMAIL!;
  const password = process.env.PASSWORD!;

  // Run before each test in this suite. This like a setup hook to prepare the testing to be successful
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

  // Test case: Send a message and verify response
  test('TC_AIChat_001_SendAndReceiveMessage', async ({ page }) => {
    test.setTimeout(90000);
    const responseText = await typeMessage(page);
    expect(responseText, 'AI response should exist').toBeTruthy();
    expect(responseText.trim().length).toBeGreaterThan(0);
    expect(responseText).toMatch(/[a-zA-Z]+/);
  });

  // Test case: Place a call and verify UI updates for call placing
  test('TC_AIChat_002_PlaceACall', async ({ page }) => {
    test.setTimeout(90000);
    await placeCall(page);
    await expect(page.getByText(ringingText)).toBeVisible();
    await expect(page.locator(hangUpBtn)).toBeVisible();
  });
});
