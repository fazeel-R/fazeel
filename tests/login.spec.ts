import test from '@playwright/test'

import { BuyerLogin } from '../pages/buyerLogin'

test("Login to the buyer", async({page})=>{

    let buyerLogin = new BuyerLogin(page)
    await buyerLogin.loadUrl('https://pxnrfort-test.powerofn.in/')
    await buyerLogin.loginDetail('fazeel@ncompass.inc', 'Admin123!')
    await buyerLogin.login()

})