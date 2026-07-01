import { expect } from '@playwright/test'
import test from '@playwright/test'
import {BuyerPreferences} from '../../pages/buyerPreference'

test.use({storageState: 'storageState/login.json'})

test('Update Buyer Preference', async({page})=>{
    const buyerPref = new BuyerPreferences(page)
    await buyerPref.homepage()
    await buyerPref.clickAccount()
    await buyerPref.navigateToPreferences()
    await buyerPref.selectWarehouseGroup()
    await page.waitForLoadState()
    await buyerPref.shippingAddress()
    await buyerPref.shippingMethod()
    await buyerPref.billingAddress()
    await buyerPref.paymentMethod()
    await buyerPref.savePreference()
    const success =await page.locator(`.MuiAlert-message`).first().innerText()
    expect(success).toContain("Successfully saved the preferences")
})

test.skip('Buyer checkout order and order charges verification', async({page})=>{

})