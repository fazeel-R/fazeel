import { test } from "@playwright/test"
import { buyerOffer } from '../../pages/buyerOffer';

const data = require('../../data.json')
test.use({ storageState: 'storageState/login.json' })

test.describe.serial(`Place new offer`, () => {

    test(`Placing new offer`, async ({ page }) => {

        const newOffer = new buyerOffer(page)
        await newOffer.acceptOffer()
        await newOffer.loadUrl(`${data.buyerUrl}stock`)
        await page.waitForTimeout(2000)
        await newOffer.selectWarehouse()
        await newOffer.placeAnOffer()
    })

})

