import test from '@playwright/test'

const creds = require('../../data.json')

import { BuyerLogin } from '../../pages/buyerLogin'
import { TenantLogin } from "../../pages/tenantLogin"
import { expect } from '@playwright/test'
import { describe } from 'node:test'

describe(`Login`, ()=>{

    test("Login to the buyer", async ({ page }) => {

    let buyerLogin = new BuyerLogin(page)
    await buyerLogin.loadUrl(creds.buyerUrl)
    await buyerLogin.loginDetail(creds.buyerCreds.userName, creds.buyerCreds.password)
    // await page.locator(`[name="username"]`).fill(`fazeel@ncompass.inc`)
    // await page.locator(`[name="password"]`).fill(`Admin123!`)
    await buyerLogin.login()
    await page.waitForTimeout(10000)

    const header = await page.locator('[data-id="stock-list-heading"]').innerText()
    expect.soft(header).toContain('Stock List')

    await page.context().storageState({ path: 'storageState/login.json' })


})

test(`Admin Login`, async({page})=>{
    const adminLogin = new TenantLogin(page)
    await adminLogin.loadUrl(`${creds.adminUrl}`)
    await adminLogin.loginDetail(`${creds.adminCreds.userName}`, `${creds.adminCreds.password}`)
    await adminLogin.login()
    await page.waitForTimeout(10000)
    const header = await page.locator('[data-id="stock-list-heading"]').innerText()
    expect.soft(header).toContain('Stock List')
    
    await page.context().storageState({ path: 'storageState/Adminlogin.json' })
})

})
