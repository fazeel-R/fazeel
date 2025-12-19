Instruction
1. Generate playwright typescript code for phonex application in creating an
order using Page Object Model, create separate folder for tests and pages.
2. Add comments for every step.
3. Follow coding best practices.
4. Create test files under “tests” and page files under “pages”.
5. Data credentials: email = fazeel@ncompass.inc, password = Admin123!.
6. After login assert the title
7. The landing page is stocklist add an item to cart by selecting buy at list with 5 Qty.
8. From cart check if checkout new order button is avaialble and click on it.
9. if checkout new order is not available click on add to existing order
10. Compile and run after generation.
11. Debug for failures post-run.
12. Show test report at the end.

Context
You are an AI assistant generating Playwright TypeScript code for the
LeaFtaps application.

Example
import { test, expect } from ‘@playwright/test’;

test(‘test’, async ({ page }) => {
  await page.goto(‘https://pxnreseller-test.powerofn.in/’);
  await page.getByRole(‘textbox’, { name: ‘Enter Email’ }).click();
  await page.getByRole(‘textbox’, { name: ‘Enter Email’ }).fill(‘fazeel@ncompass.inc’);
  await page.getByRole(‘textbox’, { name: ‘Enter Password’ }).click();
  await page.getByRole(‘textbox’, { name: ‘Enter Password’ }).press(‘CapsLock’);
  await page.getByRole(‘textbox’, { name: ‘Enter Password’ }).fill(‘Admin123!’);
  await page.getByRole(‘button’, { name: ‘SIGN IN’ }).click();
  await page.getByRole(‘button’, { name: ‘Close’ }).click();
  await expect(page.locator(‘h2’)).toContainText(‘Stock List’);
  await page.getByRole(‘button’, { name: ‘Buy or Make Offer Supplier...’ }).first().click();
});