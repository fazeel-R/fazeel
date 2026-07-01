import {test, expect} from '@playwright/test'
import { customer } from '../../pages/customers'
const data = require('../../data.json')
test.use({storageState: 'storageState/Adminlogin.json'})

test(`Updating Customer Addresses`, async({page})=>{
    const customers = new customer(page)
    await customers.loadurl(`${data.adminUrl}customers`)
    
    await page.waitForTimeout(8000)
    await customers.customerSearch(`${data.adminCreds.custId}`)
    //await page.waitForTimeout(3000)
    await customers.navigateToCustomerDetails()
    await customers.assertBuyer()
    await customers.addnewShippingAddress()
    await customers.fillShippingAddressForm()
    await customers.updateAddress()
    await customers.deleteAddress()

})

test.skip(`Checking preference for added customer address`, async({page})=>{
    const customers = new customer(page)
    await customers.loadurl(`${data.adminUrl}customers`)
    
    await page.waitForTimeout(8000)
    await customers.customerSearch(`${data.adminCreds.custId}`)
    //await page.waitForTimeout(3000)
    await customers.navigateToCustomerDetails()
    await customers.assertBuyer()
    //await customers.buyerpreference()
    const preferenceHeader = await page.getByText(`Checkout Preferences`, {exact:true}).innerText()
    expect(preferenceHeader).toContain(`Checkout Preferences`)

    

})

test.skip(`Update buyer preference from admin`, async({page})=>{
    const customers = new customer(page)
    await customers.loadurl(`${data.adminUrl}customers`)
    await page.waitForTimeout(8000)
    await customers.customerSearch(`${data.adminCreds.custId}`)
    await customers.navigateToCustomerDetails()
    await customers.assertBuyer()
    await customers.adminbuyerpreference()
    await customers.updateShippingAddress()
    await customers.updateShippingMethod()
    await customers.updateBillingAddress()
    await customers.updatePaymentMethod()
    await customers.updateAdditionalService()
    //await customers.savePreference()
    expect(page.locator(`.buyerpreference`).first()).toHaveText(`Checkout Preferences saved successfully`)
})