// remove-items-from-cart.spec.ts
import { test } from '@playwright/test';
import { BuyerCart } from '../pages/buyercart';
const creds = require('../creds.json')

test.use({ storageState: 'storageState/login.json' });

test('Removing Items From cart', async ({ page }) => {
  const removeItemsFromCart = new BuyerCart(page);

  await removeItemsFromCart.homepage(`${creds.buyerUrl}/stock`);
  await removeItemsFromCart.navigatingToCart('[data-id="totalCartItems"]');
  await page.waitForTimeout(3000)
  await removeItemsFromCart.deletingItemsFromCart();

});
