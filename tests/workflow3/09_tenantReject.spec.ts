import test from "@playwright/test";
import { TenantOffer } from "../../pages/tenantOffers";
test.use({ storageState: 'storageState/Adminlogin.json' })
const data = require('../../data.json')

test.skip(`Reject offer`, async ({ page }) => {
    const TenantOffers = new TenantOffer(page)
    await TenantOffers.loadUrl(`${data.adminUrl}offer-clearing`)
    await TenantOffers.filterCustomer()
    await TenantOffers.expandOffers()
    await TenantOffers.rejectOffer()

})