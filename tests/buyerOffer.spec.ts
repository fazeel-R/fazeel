// remove-items-from-cart.spec.ts
import { test } from '@playwright/test';
import { BuyerCart } from '../pages/buyercart';

test.use({ storageState: 'storageState/login.json' });

test('Removing Items From cart', async ({ page }) => {
  const removeItemsFromCart = new BuyerCart(page);

  await removeItemsFromCart.homepage('https://pxnrfort-test.powerofn.in/stock');
  await removeItemsFromCart.navigatingToCart('[data-id="totalCartItems"]');
  await page.waitForTimeout(3000)
  await removeItemsFromCart.deletingItemsFromCart();

});
