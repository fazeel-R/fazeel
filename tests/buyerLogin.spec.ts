import test from '@playwright/test'

const creds = require('../creds.json')

import { BuyerLogin } from '../pages/buyerLogin'
import { expect } from '@playwright/test'
test("Login to the buyer", async ({ page }) => {

    let buyerLogin = new BuyerLogin(page)
    await buyerLogin.loadUrl(creds.buyerUrl)
    await buyerLogin.loginDetail(creds.buyerCreds.userName, creds.buyerCreds.password)
    await buyerLogin.login()
    await page.waitForTimeout(10000)

    const header = await page.locator('[data-id="stock-list-heading"]').innerText()
    expect.soft(header).toContain('Stock List')

    await page.context().storageState({ path: 'storageState/login.json' })


})