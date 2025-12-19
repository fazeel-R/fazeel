import test from '@playwright/test'

import { TenantOffer } from "../../pages/tenantOffers";
test.use({ storageState: 'storageState/Adminlogin.json' })
const data = require('../../data.json')

test(`Accept Offer from admin`, async({page})=>{
        const adminofferupdate = new TenantOffer(page)
        await adminofferupdate.loadUrl(`${data.adminUrl}offer-clearing`)
        await adminofferupdate.filterCustomer()
        await adminofferupdate.expandOffers()
        await adminofferupdate.acceptOffer()
    })
