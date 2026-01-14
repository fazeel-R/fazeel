import { wrapperMethod } from "../wrappermethods.ts/wrapper1"
const data = require('../data.json')

export class BuyerLogin extends wrapperMethod {

    async loadUrl(url: string) {
        await this.url(url)

    }

    async loginDetail(userName: string, passWord: string) {
        await this.inputText('[name="username"]', userName)
        await this.inputText('[name="password"]', passWord)

    }

    async login() {
        await this.clickButton('[type="submit"]')

    }

    async buyerLogin(){
        await this.loadUrl(`${data.buyerUrl}`)
        await this.page.locator('[name="email"]').fill(`${data.buyerCreds.userName}`)
        await this.page.locator('[name="password"]').fill(`${data.buyerCreds.password}`)
        await this.clickButton(`[type="submit"]`)

        await this.page.waitForTimeout(10000)
        await this.page.context().storageState({path: `storageState/login.json`})

    }


}