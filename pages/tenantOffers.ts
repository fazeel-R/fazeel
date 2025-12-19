import { wrapperMethod } from "../wrappermethods.ts/wrapper1"

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

    

    async counterOffer(){
       
    }

}