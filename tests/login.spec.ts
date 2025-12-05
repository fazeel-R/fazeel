import test from '@playwright/test'

const creds = require('../creds.json')

import { BuyerLogin } from '../pages/buyerLogin'
import { expect } from '@playwright/test'
import { Context } from 'mocha'

test("Login to the buyer", async({page})=>{

    let buyerLogin = new BuyerLogin(page)
    await buyerLogin.loadUrl('https://pxnrfort-test.powerofn.in/')
    await buyerLogin.loadUrl(creds.buyerUrl)
    await buyerLogin.loginDetail(creds.buyerCreds.userName, creds.buyerCreds.password)
    await buyerLogin.login()
    await page.context().storageState({path: 'storageState/login.json'})

})