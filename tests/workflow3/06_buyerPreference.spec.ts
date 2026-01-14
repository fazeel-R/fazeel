import test from '@playwright/test'
import { BuyerPreferences } from '../../pages/buyerPreference'
import { expect } from '@playwright/test'
test.use({storageState : 'storageState/login.json'})

test.skip("Updating buyer preferences", async({page})=>{
    const buyerUpdate = new BuyerPreferences(page)
    await buyerUpdate.homepage()
    await buyerUpdate.clickAccount()
    await buyerUpdate.navigateToPreferences()
    //wait buyerUpdate.selectWarehouseGroup()
    await expect(page).toHaveTitle(`QaPXNResellerAuto - Checkout Preferences`);
})