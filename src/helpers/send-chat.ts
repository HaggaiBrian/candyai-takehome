import { Page, expect } from '@playwright/test';
import { loveMessages } from '../data';
import chatPageSelectors from '../page-objects/chat-page';

const { messageTextbox, askBtn, sendQuestionBtn, loader } = chatPageSelectors.messageSection;
const { suggestionBox } = chatPageSelectors.askSection;
const { messagesTextfield } = chatPageSelectors.messagesViewSection;

export async function typeMessage(page: Page): Promise<string> {
  const fakeMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
  const textboxLocator = page.getByRole('textbox', messageTextbox);
  await textboxLocator.waitFor();
  await textboxLocator.click();
  await textboxLocator.fill(fakeMessage);
  await page.locator(sendQuestionBtn).click();
  const loaderLocator = page.locator(loader).first();
  try {
    await loaderLocator.waitFor({ state: 'visible', timeout: 10000 });
    await loaderLocator.waitFor({ state: 'hidden', timeout: 60000 });
  } catch (err) {
    console.warn('Loader did not appear or stayed visible too long, continuing...');
  }
  const responseLocator = page.locator(messagesTextfield).last();
  return (await responseLocator.textContent())?.trim() || '';
}

export async function ask(page: Page, suggestionText = 'Show me...'): Promise<void> {
  await page.getByRole('button', askBtn).waitFor();
  await page.getByRole('button', askBtn).click();
  await expect(page.locator(suggestionBox)).toBeVisible();
  const suggestions = page.locator(suggestionBox).locator('[data-message-ask-v2-target="suggestion"]');
  const count = await suggestions.count();
  for (let i = 0; i < count; i++) {
    const text = await suggestions.nth(i).innerText();
    console.log(`Suggestion ${i + 1}: ${text}`);
  }
  const selectedOption = page.locator(suggestionBox).getByText(suggestionText, { exact: true });
  await selectedOption.click();
  const generatedImage = page.locator('img[src*="data:image"]');
  await expect(generatedImage).toBeVisible({ timeout: 10000 });
}

