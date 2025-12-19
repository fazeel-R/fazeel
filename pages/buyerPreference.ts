import { wrapperMethod } from '../wrappermethods.ts/wrapper1';
const data = require('../data.json')

export class BuyerPreferences extends wrapperMethod {
    async homepage() {

        await this.url(`${data.buyerUrl}/stock`)

    }
    async clickAccount() {
        await this.clickButton(`//button[@class='MuiButtonBase-root MuiIconButton-root px-user-initials MuiIconButton-colorPrimary']`)

    }
    async navigateToPreferences() {
        await this.clickButton('[data-id="myPreferencesBtn"]')
    }

    async selectWarehouseGroup() {
        await this.clickButton(`[data-id="405"]`)
    }

    async shippingAddress(){
        const shippingAddress = this.page.locator(`[data-id="shippingAddress-edit"]`).isVisible()
        if(await shippingAddress){
            await this.clickButton(``)

        }
    }
}