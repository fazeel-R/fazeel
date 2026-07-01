import { test } from "@playwright/test"
import { BuyerCart } from "../../pages/buyercart"
import { buyerOffer } from '../../pages/buyerOffer';
import { buyerLoginAndSaveToken } from "../../Api/buyerLogin"
import { getBuyerOffers } from "../../Api/buyerApi"

import { expect } from "@playwright/test";

const data = require('../../data.json')

test.use({ storageState: 'storageState/login.json' })

test.describe.serial(`Place new offer`, () => {

    test.skip(`Placing new offer`, async ({ page }) => {

        const newOffer = new buyerOffer(page)
        const buyerCart = new BuyerCart(page)
        await newOffer.acceptOffer()
        await newOffer.loadUrl(`${data.buyerUrl}stock`)
        await page.waitForTimeout(2000)
        await newOffer.selectWarehouse()
        await newOffer.checkOfferPermission()
        await newOffer.placeAnOffer()
        await page.waitForTimeout(1000)
        const successMessage = await page.locator(`.MuiAlert-message`).first().innerText()
        expect(successMessage).toContain(`Added to the Cart`)

    })

    test.skip(`Verify Offer status`, async ({ page }) => {
        const buyerCart = new BuyerCart(page)
        const newOffer = new buyerOffer(page)
        await buyerCart.url(`${data.buyerUrl}stock`)
        await buyerCart.navigatingToCart()
        await page.locator('[data-id="tab"]').nth(2).click()
        await newOffer.verifyOfferedStatus()
        await newOffer.editOfferQty()


    })

    test.skip(`get Offer Details`, async ({ page }) => {
        await buyerLoginAndSaveToken()
        await getBuyerOffers()
        await page.waitForTimeout(2000)

    })

    test.skip(`Update Offer price`, async ({ page }) => {
        const buyerCart = new BuyerCart(page)
        const newOffer = new buyerOffer(page)
        await buyerCart.url(`${data.buyerUrl}stock`)
        await buyerCart.navigatingToCart()
        await page.locator('[data-id="tab"]').nth(2).click()
        await newOffer.editOfferPrice()

    })

})

