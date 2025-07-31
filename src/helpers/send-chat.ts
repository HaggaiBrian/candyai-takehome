import { Page } from '@playwright/test';
import { loveMessages } from '../data';
import chatPageSelectors from '../page-objects/chat-page';

const { messageTextbox, sendQuestionBtn, loader } = chatPageSelectors.messageSection;
const { telephoneIcon, confirmCallModal } = chatPageSelectors.callSection;
const { messagesTextfield } = chatPageSelectors.messagesViewSection;

/**
 * Sends a random message from the loveMessages list via the chat interface.
 *
 * @param page - Playwright Page object for browser interaction.
 * @returns The AI-generated response text, trimmed of whitespace.
 */
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

/**
 * Initiates a phone call by clicking the designated phone icon and confirming the modal prompt.
 *
 * @param page - Playwright Page object for browser interaction.
 */
export async function placeCall(page: Page): Promise<void> {
  await page.locator(telephoneIcon).nth(1).click();
  await page.getByText(confirmCallModal).click();
}
