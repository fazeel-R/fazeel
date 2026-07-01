import { expect } from "@playwright/test"
import { wrapperMethod } from "../wrappermethods.ts/wrapper1"
import { readApiJson, writeApiJson } from "../utils/apiFileManager"
const offerDetails = require('../test-data/api/buyer-offers.json')

export class TenantOffer extends wrapperMethod {
    //const offerPrice = apiresponse.item.offerprice
    async loadUrl(url: string) {
        await this.url(url)
    }

    async filterCustomer() {
        await this.clickButton(`[data-id="buyerId"]`)
        await this.clickButton(`[name="1739"]`)
        //   await page.locator(`[data-id="buyerId"]`).click()
        //   await page.locator(`[name="1739"]`).click()
        await this.page.getByRole(`button`, { name: 'APPLY' }).click()

    }

    async expandOffers(){
        await this.clickButton(`[data-id="open"]`)
    }

    async acceptOffer(){
        const accept =await this.page.locator(`[data-id="accept"]`).isEnabled()
        if(accept){
            await this.clickButton(`[data-id="accept"]`)
        }
        else{
            await this.clickButton(`[data-id="reject"]`)
        }
    }

    async rejectOffer(){
        const reject =await this.page.locator(`[data-id="reject"]`)
        expect(reject).toBeVisible()
        await this.clickButton(`[data-id="reject"]`)      
    }

    async counterOffer(){
        const item = await this.page.locator(`[data-id="itemDescription"]`).first().innerText()
        const sku = item.match(/\((\d+)\)/)?.[1];
        //console.log(sku);
        const skuNumber = `${sku}INSTOCK`

        const offerId = offerDetails[skuNumber].stocklistOffer.offerId
        const offerPrice = offerDetails[skuNumber].stocklistOffer.offerPrice
        const listPrice = offerDetails[skuNumber].stocklistOffer.listPrice
       
        
        const counter =await this.page.locator(`[name="${offerId}"]`)
        const counterPrice = listPrice-2
        await counter.fill(String(counterPrice))
        await this.clickButton(`[data-id="counter"]`)
        await writeApiJson('offerDetails.json', counterPrice)

    }

    async searchItemInPricing(itemNumber:number){
        await this.clickButton(`[data-id="searchOptions"]`)
        await this.clickButton(`[data-value="itemNumber"]`)
        await this.page.getByPlaceholder(`Search Item # (paste cells from spreadsheet)`).fill(`${itemNumber}`)
    }

    async updateLowPrice(){
        await this.inputText(`[item-field="lowPrice"]`, `100`)

    }

    async updateListPrice(offerPrice:number){
        await this.inputText(`[item-field="listPrice"]`, `${offerPrice-1}`)
    }

    async publishDraft(){
        await this.clickButton(`[data-id="publishDraft"]`)
    }

    async saveDraftChanges(){
        await this.page.getByRole(`button`, {name: 'CONFIRM'}).click()
    }
    async publishSuccessSnackbar(){
        const snackbar = await this.page.locator(`.MuiAlert-message`).first().innerText()
        expect(snackbar).toContain(`Pricing published successfully`)
    }

    async getItemNumber(){
        const itemLocator = await this.page.locator(`.text-faded`).innerText()
        const item= itemLocator.match(/\(([\d+])/)?.[1]
        //(/($\d.))
    }

    async verifyOfferPrice(){
        const readOffer = await readApiJson('buyer-offers.json')
        //const listPrice = await 
    }

    

}