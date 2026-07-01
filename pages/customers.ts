import { count } from "console";
import { wrapperMethod } from "../wrappermethods.ts/wrapper1";
import { expect } from "@playwright/test";

export class customer extends wrapperMethod {
    async loadurl(url: string) {
        await this.url(url)

    }

    async customerSearch(id: string) {
        await this.page.getByPlaceholder(`Search Customer`).fill(id)
    }


    async navigateToCustomerDetails() {
        await this.page.getByRole('link', { name: 'QA' }).click()
        // await this.clickButton(`//a[@class='px-buyer-name-link']`)

    }

    async assertBuyer() {
        const buyerId = await this.page.locator(`[data-id="buyerId"]`).innerText()
        expect(buyerId).toContain(`1739`)
    }

    async addnewShippingAddress() {
        await this.clickButton(`[data-id="add"]`)
    }

    async fillShippingAddressForm() {
        await this.inputText(`[name="contact"]`, `QA`)
        await this.page.locator(`[name="country"]`).fill(`United states`)
        await this.page.getByText('United States', { exact: true }).click()
        await this.inputText(`[name="address1"]`, `New address`)
        await this.inputText(`[name="city"]`, `California`)
        await this.clickButton(`[name="state"]`)
        await this.page.getByText('Alabama', { exact: true }).click()
        await this.clickButton(`[name="shippingAddress"]`)
        await this.clickButton(`[data-id="okay"]`)
    }

    async deleteAddress() {
        await this.page.locator(`[data-id="deleteAddress"]`).nth(1).click()
        await this.clickButton(`[data-id="okay"]`)
    }

    async updateAddress() {
        await this.page.locator(`[data-id="editAddress"]`).nth(1).click()
        await this.inputText(`[name="contact"]`, `QA2`)
        await this.inputText(`[name="zip"]`, `10001`)
        await this.clickButton(`[data-id="okay"]`)
    }

    async adminbuyerpreference() {
        await this.clickButton(`[data-id="checkoutPreferences"]`)
    }

    async updateShippingAddress() {
        
        // const editShippingaddress = await this.page.locator(`[data-id="shippingAddress-edit"]`).first().isVisible()
        
        // if (!editShippingaddress) {
        //     // await this.clickButton(`[data-id="shippingAddress-edit"]`)
        //     console.log(`Cannot update shipping address`)

        // }
        // else {
        //     await this.page.locator(`[data-id="shippingAddress-edit"]`).first().click()
        //     await this.clickButton(`[value="1204"]`)
        // }
        const editShippingaddress = await this.page.locator(`[data-id="shippingAddress-edit"]`)
        if(await editShippingaddress.count()>0){
            //expect(editShippingaddress.first()).toBeVisible()
            await editShippingaddress.first().click()
            await this.clickButton(`[value="1205"]`) 

        }
        else{
            console.log(`Shipping method cannot be updated`)
        }
    }

    async updateShippingMethod() {
        // const editShippingMethod = await this.page.locator(`[data-id="shippingAddress-edit"]`).first().isVisible()
        // if (!editShippingMethod) {
        //     await this.clickButton(`[value="CARRIER_PICKUP"]`)
        // }
        // else {
        //     await this.page.locator(`[data-id="shippingAddress-edit"]`).first().click()
        //     await this.clickButton(`[value="CARRIER_PICKUP"]`)
        // }

        const editShippingmethod = this.page.locator(`[data-id="shippingMethod-edit"]`)
        console.log(editShippingmethod,count())
        if(await editShippingmethod.count()>0){
            //await expect(editShippingmethod.first()).toBeVisible()
            await editShippingmethod.first().click()
            await this.clickButton(`[value="REQUEST_A_QUOTE"]`) 

        }
        else if(await this.page.locator(`[data-id="shippingMethod-done"]`).count()>0){
            await this.clickButton(`[value="REQUEST_A_QUOTE"]`)

        }
        else{
            console.log(`Shipping method cannot be updated`)
        }
    }

    async updateBillingAddress() {
        // const editBilling = await this.page.locator(`[data-id="billingAddress-edit"]`).first().isVisible()
        // if (!editBilling) {
        //     console.log(`Cannot update billing address`)
        // }
        // else {
        //     await this.page.locator(`[data-id="billingAddress-edit"]`).first().click()
        //     await this.clickButton(`[value="1204"]`)

        // }
        const editbillingaddress = await this.page.locator(`[data-id="billingAddress-edit"]`)
        const count= editbillingaddress.count()
        if(await count>0){
            //await expect(editbillingaddress.first()).toBeVisible()
            await editbillingaddress.first().click()
            await this.clickButton(`[value="1205"]`) 

        }
        else{
            console.log(`Billing method cannot be updated`)
        }
    }

    async updatePaymentMethod() {
        // const editpaymentmethod = await this.page.locator(`[data-id="paymentMethod-edit"]`).first().isVisible()
        // if (!editpaymentmethod) {
        //     await this.clickButton(`[value="WIRE"]`)
        // }
        // else {
        //     await this.page.locator(`[data-id="paymentMethod-edit"]`).first().click()
        //     await this.clickButton(`[value="WIRE"]`)

        // }
        const editPaymentMethod = await this.page.locator(`[data-id="paymentMethod-edit"]`)
        if(await editPaymentMethod.count()>0){
            //expect(editPaymentMethod.first()).toBeVisible()
            await editPaymentMethod.first().click()
            await this.clickButton(`[value="ACH"]`) 

        }
        else if(await this.page.locator(`[data-id="paymentMethod-done"]`).count()>0){
            await this.clickButton(`[value="ACH"]`)

        }
        else{
            console.log(`Shipping method cannot be updated`)
        }
        //[data-id="paymentMethod-done"]
    }

    async updateAdditionalService() {
        await this.page.locator(`[value="CUSTOM_1"]`).check()
    }

    async savePreference() {
        await this.page.getByRole('button', { name: ' SAVE PREFERENCES' }).click()

    }








}