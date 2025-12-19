import {test} from "@playwright/test"
import { describe } from "node:test"
import { buyerOffer } from '../pages/buyerOffer';
import { TenantOffer } from "../pages/tenantOffers";
// test.use({ storageState: 'storageState/login.json' })
// test.use({ storageState: 'storageState/Adminlogin.json' })

const data = require('../data.json')

describe(`Placing an offer from Buyer and accepting it from admin`, () => {
    test(`Placing new offer`, async ({ page }) => {
        test.use({ storageState: 'storageState/login.json' })
        const newOffer = new buyerOffer(page)
        await newOffer.loadUrl(`${data.buyerUrl}stock`)
        await page.waitForTimeout(2000)
        await newOffer.selectWarehouse()
        await newOffer.placeAnOffer()
    })
    test(`Accept Offer from admin`, async({page})=>{
        test.use({ storageState: 'storageState/Adminlogin.json' })
        const adminofferupdate = new TenantOffer(page)
        await adminofferupdate.loadUrl(`${data.adminUrl}offer-clearing`)
        await adminofferupdate.filterCustomer()
        await adminofferupdate.expandOffers()
        await adminofferupdate.acceptOffer()
    })
})