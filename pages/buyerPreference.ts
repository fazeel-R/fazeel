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

    async selectWarehouseGroup(warehouseGroupId = '405') {
        await this.clickButton(`[data-id="${warehouseGroupId}"]`)
    }

    async shippingAddress(shippingAddressId = '1205'){
        const shippingAddress = this.page.locator('[data-id="shippingAddress-edit"]').first()
        if(await shippingAddress.isVisible({timeout: 3000})){
            await shippingAddress.click()
            await this.clickButton(`[value="${shippingAddressId}"]`)
        }
    }

    async shippingMethod(shippingMethodValue = 'CARRIER_PICKUP', insured: 'YES' | 'NO' = 'YES'){
        const shippingMethod = this.page.locator('[data-id="shippingMethod-edit"]').first()
        if(await shippingMethod.isVisible()){
            await shippingMethod.click()
            await this.clickButton(`[value="${shippingMethodValue}"]`)
            const insurance = this.page.locator('[data-id="insured"]')
            if(await insurance.isVisible()){
                await insurance.click()
                await this.clickButton(`[data-value="${insured}"]`)
            }
        }
    }

    async billingAddress(billingAddressId = '1205'){
        const billingAddress = this.page.locator('[data-id="billingAddress-edit"]').first()
        if(await billingAddress.isVisible()){
            await billingAddress.click()
            await this.clickButton(`[value="${billingAddressId}"]`)
        }
    }

    async paymentMethod(paymentMethodId = 'ACH'){
        const payment = this.page.locator('[data-id="paymentMethod-edit"]').first()
        if(await payment.isVisible()){
            await payment.click()
            await this.clickButton(`[value="${paymentMethodId}"]`)
        }
    }

    async savePreference(){
        const savepref = this.page.locator('[data-id="savePreferences"]')
        if(await savepref.isEnabled()){
            await this.clickButton('[data-id="savePreferences"]')
        }
    }

    async updatePreferences(options: {
        warehouseGroupId?: string
        shippingAddressId?: string
        shippingMethodValue?: string
        insured?: 'YES' | 'NO'
        billingAddressId?: string
        paymentMethodId?: string
    } = {}){
        await this.selectWarehouseGroup(options.warehouseGroupId ?? '405')
        await this.shippingAddress(options.shippingAddressId ?? '1205')
        await this.shippingMethod(options.shippingMethodValue ?? 'CARRIER_PICKUP', options.insured ?? 'YES')
        await this.billingAddress(options.billingAddressId ?? '1205')
        await this.paymentMethod(options.paymentMethodId ?? 'ACH')
        await this.savePreference()
    }
}