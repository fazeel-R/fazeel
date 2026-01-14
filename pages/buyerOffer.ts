import { wrapperMethod } from "../wrappermethods.ts/wrapper1";
import { expect } from "@playwright/test";
const data = require('../data.json')
const offerPermission = require('../test-data/api/stocklist-settings.json')


export class buyerOffer extends wrapperMethod{

    async enableAcceptOffers(){
        
    }

    async loadUrl(url:string){
        await this.url(url)

    }
    async selectWarehouse(){
        const onHandwarehouse =this.page.locator(`${data.onHandWarehouseGroup}`)
        // if(await onHandwarehouse){
        //     await this.clickButton(`${data.onHandWarehouseGroup}`)
        // }
        // else{
        //     console.log(`On-hand Warehouse group not present`)
            
        // }
        await onHandwarehouse.click()
        
        //await this.clickButton(`[data-id="INSTOCK"]`)
    }
    async acceptOffer() {
        const acceptOffer = offerPermission['408'].acceptOffer
        expect(acceptOffer).toBe(true)
        
    }

    async placeAnOffer(){

        
        const buyOffer = this.page.locator(`.px-open-stock-list-group`)
        const count =await buyOffer.count()
        console.log(count)
        const number = Math.floor(Math.random() * count);  
        await buyOffer.nth(number).click()
        const itemPricetext = await this.page.locator(`[data-id="price"]`).first().innerText()
        const itemPrice = Number(itemPricetext.replace(/[^\d]/g, ''));
        let offerPrice = itemPrice - count
        
        await this.page.locator(`[data-id="offer"]`).first().click()
        await this.page.locator(`[id="offerPrice"]`).clear()
        await this.page.locator(`[id="offerPrice"]`).fill(`${offerPrice}`)
        await this.page.getByText(`ADD OFFER TO CART`).click()
        await this.page.waitForTimeout(2000)
        expect.soft(this.page.locator(`.MuiAlert-message`).first()).toContainText(`Added to the Cart`)


    }
}