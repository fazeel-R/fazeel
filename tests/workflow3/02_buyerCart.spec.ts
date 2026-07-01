// remove-items-from-cart.spec.ts
import { test } from '@playwright/test';
import { BuyerCart } from '../../pages/buyercart';
import { BuyerLogin } from '../../pages/buyerLogin';
const creds = require('../../data.json')

test.use({ storageState: 'storageState/login.json' });
test.describe.serial(`buyer Delete cart items`, () => {
  test.skip('Removing Items From cart', async ({ page }) => {
    const removeItemsFromCart = new BuyerCart(page);

    await removeItemsFromCart.homepage(`${creds.buyerUrl}/stock`);
    await removeItemsFromCart.navigatingToCart();
    await page.waitForTimeout(3000)
    await removeItemsFromCart.deletingItemsFromCart();

  });

  test.skip('Remove items from offer awaiting buyer review', async ({ page }) => {
    const removeItemsFromCart = new BuyerCart(page);

    await removeItemsFromCart.homepage(`${creds.buyerUrl}/stock`);
    await removeItemsFromCart.navigatingToCart();
    await page.waitForTimeout(3000)
    await removeItemsFromCart.deleteItemsFromOfferAwaitingBuyerReview()


  })

  test.skip('Remove items from offer awaiting admin review', async ({ page }) => {
    const removeItemsFromCart = new BuyerCart(page);

    await removeItemsFromCart.homepage(`${creds.buyerUrl}/stock`);
    await removeItemsFromCart.navigatingToCart();
    await page.waitForTimeout(3000)
    await removeItemsFromCart.deleteItemsFromOfferUnderAdminReview()


  })

})

test.skip(`login to update the storageState`, async ({ page }) => {
  const buyerLogin = new BuyerLogin(page)
  await buyerLogin.buyerLogin()

})