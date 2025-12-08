import test from '@playwright/test'
import { BuyerPreferences } from '../pages/buyerPreference'
import { expect } from '@playwright/test'
test.use({storageState : 'storageState/login.json'})

test("Updating buyer preferences", async({page})=>{
    const buyerUpdate = new BuyerPreferences(page)
    await buyerUpdate.homepage()
    await buyerUpdate.clickAccount()
    await buyerUpdate.navigateToPreferences()
    await buyerUpdate.selectWarehouseGroup()
    //await expect(page.title()).toContain('Checkout preferences')
    await expect(page).toHaveTitle(`PXNRFort - Checkout Preferences`);
})