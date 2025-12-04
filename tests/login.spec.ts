import test from '@playwright/test'

const creds = require('../creds.json')

import { BuyerLogin } from '../pages/buyerLogin'

test("Login to the buyer", async({page})=>{

    let buyerLogin = new BuyerLogin(page)
    //await buyerLogin.loadUrl('https://pxnrfort-test.powerofn.in/')
    await buyerLogin.loadUrl(creds.buyerUrl)
    console.log(page.url())
    await buyerLogin.loginDetail('fazeel@ncompass.inc', 'Admin123!')
    await buyerLogin.login()

})