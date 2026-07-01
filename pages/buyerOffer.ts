import { wrapperMethod } from "../wrappermethods.ts/wrapper1";
import { expect } from "@playwright/test";
import { readApiJson, writeApiJson } from "../utils/apiFileManager";
const data = require('../data.json')
const offerPermission = require('../test-data/api/stocklist-settings.json')

export class buyerOffer extends wrapperMethod {

    async loadUrl(url: string) {
        await this.url(url)

    }

    // async selectWarehouse() {
    //     const onHandwarehouse =await this.page.locator(`[value="408"]`)
    //     if(await onHandwarehouse.isVisible({timeout:5000})){
    //         await this.page.locator(`${data.onHandWarehouseGroup}`).click()
    //         await this.page.locator(`[data-id="INSTOCK"]`).nth(1).click()

    //     }
    //     else{
    //         await this.page.getByRole('button', {name:"FILTER"}).click()
    //     }
    //     // await onHandwarehouse.click({timeout:5000})
    //     // await this.page.locator(`[data-id="INSTOCK"]`).nth(1).click()
    // }
    async selectWarehouse() {
    const filterButton = this.page.getByRole('button', { name: 'FILTER' });
    const warehouseRadio = this.page.locator('[value="408"]');

    // 1. Handle the Responsive "FILTER" button
    // If it's visible (small screen), click it to reveal the menu.
    // If it's not there (standard screen), just move on.
    if (await filterButton.isVisible()) {
        await filterButton.click();
    }

    // 2. Click the Warehouse
    // This will now work for both resolutions because the radio 
    // is either already visible or was just revealed by the click above.
    await warehouseRadio.click();

    // 3. Select In-Stock status
    // Avoid nth(1) if possible; use a more specific locator
    await this.page.locator('[data-id="INSTOCK"]').filter({ hasText: 'In Stock' }).click();
}
    async checkOfferPermission() {

        const offer = await this.page.locator(`[data-id="offer"]`).first()
        expect(offer).toBeVisible()

    }


    async acceptOffer() {
        const acceptOffer = offerPermission['408'].acceptOffer
        expect(acceptOffer).toBe(true)

    }

    async placeAnOffer() {
        const buyOffer = this.page.locator(`.px-open-stock-list-group`)
        const count = await buyOffer.count()
        const number = Math.floor(Math.random() * count);
        await buyOffer.nth(number).click()
        const itemPricetext = await this.page.locator(`[data-id="price"]`).first().innerText()
        const itemPrice = Number(itemPricetext.replace(/[^\d]/g, ''));
        let offerPrice = itemPrice - count

        await this.page.locator(`[data-id="offer"]`).first().click()
        await this.page.locator(`[id="offerPrice"]`).clear()
        await this.page.locator(`[id="offerPrice"]`).fill(`${offerPrice}`)
        //await writeApiJson(`offerDetails.json`,`offerPrice:${offerPrice}`)
        await this.page.getByText(`ADD OFFER TO CART`).click()
        await this.page.waitForTimeout(2000)
        //expect.soft(this.page.locator(`.MuiAlert-message`).first()).toContainText(`Added to the Cart`)

    }

    async verifyOfferedStatus() {
        const offerStatus = await this.page.locator(`[data-id="status"]`).innerText()
        expect(offerStatus).toContain('Offered')
    }

    async verifyAcceptStatusInCart() {
        const offerStatus = await this.page.locator(`[data-id="status"]`).innerText()
        expect(offerStatus).toContain(`Accepted`)

    }

    async verifyRejectStatusInCart() {
        const offerStatus = await this.page.locator(`[data-id="status"]`).innerText()
        expect(offerStatus).toContain('Rejected')

    }

    async verifyCounterStatusInCart() {
        const offerStatus = await this.page.locator(`[data-id="status"]`).innerText()
        expect(offerStatus).toContain('Countered')

    }

    async editItemQty() {
        await this.clickButton(`[data-id="editOfferOrJustQuantity"]`)
        await this.page.locator(`.MuiInputBase-input.MuiOutlinedInput-input`).clear()
        await this.page.locator(`.MuiInputBase-input.MuiOutlinedInput-input`).fill(`5`)
        await this.page.getByRole('button', { name: 'SAVE' }).click()
        const success = await this.page.locator(`.MuiAlert-message`).first().innerText()
        expect(success).toContain(`Your offer was updated`)

    }

    async editOfferQty() {
        await this.clickButton(`[data-id="editOffer"]`)
        await this.page.locator(`.MuiInputBase-input.MuiOutlinedInput-input`).first().clear()
        await this.page.locator(`.MuiInputBase-input.MuiOutlinedInput-input`).first().fill(`5`)
        await this.page.getByRole('button', { name: 'SAVE' }).click()
        const success = await this.page.locator(`.MuiAlert-message`).first().innerText()
        expect(success).toContain(`Your offer was updated`)

    }

    async editOfferPrice() {
        const offerDetails =await readApiJson('buyer-offers.json')
        const item = await this.page.locator(`[data-id="itemNumber"]`).first().innerText()
        //const sku = item.match(/\((\d+)\)/)?.[1];
        const sku = item.match(/\(([^)]+)\)/) ?.[1]
        const skuNumber = `${sku}INSTOCK`
        console.log(skuNumber)
        //const listPrice = await this.page.locator(`[data-id="listPrice"]`).innerText()
        const offerPrice = await offerDetails[skuNumber].stocklistOffer.offerPrice
        const ListPrice = await offerDetails[skuNumber].listPrice
        const UpdatedPrice =ListPrice-2
        console.log(UpdatedPrice)
        await this.clickButton(`[data-id="editOffer"]`)
        
        
        await this.page.locator(`[value="${offerPrice}"]`).clear()
        await this.page.locator(`[value="0"]`).fill(`${UpdatedPrice}`)
        await this.page.getByRole('button', { name: 'SAVE' }).click()
        const success = await this.page.locator(`.MuiAlert-message`).first().innerText()
        expect(success).toContain(`Your offer was updated`)

    }

    async verifyPriceDropStatus() {
        const offerStatus = await this.page.locator(`[data-id="status"]`).innerText()
        expect(offerStatus).toContain('price drop')

    }

}