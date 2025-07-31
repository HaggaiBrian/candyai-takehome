import { Page } from '@playwright/test';
import homePageSelectors from '../page-objects/home-page';
import stageAccessKeyPageSelectors from '../page-objects/stage-access-key-page';

const { stageAccessKeyTextbox, submitBtn } = stageAccessKeyPageSelectors.stageAccessModal;
const { closeBtn } = homePageSelectors.popupModal;

export async function enterAccessKeyIfVisibleAndSubmit(page: Page, accessKey: string): Promise<void> {
  const textboxLocator = page.getByRole('textbox', stageAccessKeyTextbox);
  if (!(await textboxLocator.isVisible())) {
    return;
  }
  await textboxLocator.click();
  await textboxLocator.fill(accessKey);
  await page.getByRole('button', submitBtn).click();
}

export async function clickCloseIfVisible(page: Page): Promise<void> {
  const closeBtnLocator = page.getByRole('button', closeBtn);
  if (!(await closeBtnLocator.isVisible())) {
    return;
  }
  await closeBtnLocator.click();
}
