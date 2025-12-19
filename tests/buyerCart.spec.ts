// remove-items-from-cart.spec.ts
import { test } from '@playwright/test';
import { BuyerCart } from '../pages/buyercart';
import { buyerOffer } from '../pages/buyerOffer';
const creds = require('../data.json')

test.use({ storageState: 'storageState/login.json' });

test('Removing Items From cart', async ({ page }) => {
  const removeItemsFromCart = new BuyerCart(page);

  await removeItemsFromCart.homepage(`${creds.buyerUrl}/stock`);
  await removeItemsFromCart.navigatingToCart('[data-id="totalCartItems"]');
  await page.waitForTimeout(3000)
  await removeItemsFromCart.deletingItemsFromCart();

});

test('Remove items from offer awaiting buyer review', async({page})=>{
    const removeItemsFromCart = new BuyerCart(page);

  await removeItemsFromCart.homepage(`${creds.buyerUrl}/stock`);
  await removeItemsFromCart.navigatingToCart('[data-id="totalCartItems"]');
  await page.waitForTimeout(3000)
  await removeItemsFromCart.deleteItemsFromOfferAwaitingBuyerReview()


})

test('Remove items from offer awaiting admin review', async({page})=>{
    const removeItemsFromCart = new BuyerCart(page);

  await removeItemsFromCart.homepage(`${creds.buyerUrl}/stock`);
  await removeItemsFromCart.navigatingToCart('[data-id="totalCartItems"]');
  await page.waitForTimeout(3000)
  await removeItemsFromCart.deleteItemsFromOfferUnderAdminReview()


})

test(`Place new offer`, async({page})=>{
    const buyernewOffer = new buyerOffer(page)
    await buyernewOffer.loadUrl(`${creds.buyerUrl}stock`)
    await page.waitForTimeout(2000)
    await buyernewOffer.selectWarehouse()
    await buyernewOffer.placeAnOffer()

})

test(`Counter Offer from Admin`, async({page})=>{
  await page.goto(`${creds.adminUrl}offer-clearing`)
  await page.locator(`[data-id="buyerId"]`).click()
  await page.locator(`[name="1739"]`).click()
  await page.getByRole(`button`, {name: 'APPLY'}).click()
  await page.locator(`[data-id="open"]`).click()
  await page.locator(`[data-id="counterField"]`).fill(``)

})