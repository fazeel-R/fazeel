import test from '@playwright/test'
import { AcceptOffers } from '../../pages/acceptOfferSettings'
const data = require('../../data.json')
test.use({ storageState: `storageState/Adminlogin.json` })

test.skip(`Enable Accept Offers`, async ({ page }) => {
    const acceptOffers = new AcceptOffers(page)
    await acceptOffers.loadUrl(`${data.adminUrl}settings`)
    await acceptOffers.navigateAcceptOffers()
    await acceptOffers.selectAcceptOffersTab()
    await acceptOffers.enableAcceptOffers()
    await page.waitForTimeout(2000)
    

})

