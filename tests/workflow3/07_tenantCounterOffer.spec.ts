import test from "@playwright/test";
import { TenantOffer } from "../../pages/tenantOffers";
import {buyerLoginAndSaveToken} from "../../Api/buyerLogin"
import {getBuyerOffers} from "../../Api/buyerApi"
test.use({ storageState: 'storageState/Adminlogin.json' })
const data = require('../../data.json')


test.skip(`get Offers api`, async({page})=>{
    await buyerLoginAndSaveToken()
    await getBuyerOffers()
})

test.skip(`Counter offer`, async ({ page }) => {
    const TenantOffers = new TenantOffer(page) 
    await TenantOffers.loadUrl(`${data.adminUrl}offer-clearing`)
    await TenantOffers.filterCustomer()
    await TenantOffers.expandOffers()
    await TenantOffers.counterOffer()


})