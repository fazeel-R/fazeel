import { wrapperMethod } from "../wrappermethods.ts/wrapper1";

export class buyerOrder extends wrapperMethod{
    async clickCheckout(){
        await this.clickButton(`[data-id="checkoutOrMoveToCartOrAddToExistingOrder"]`)
        await this.page.waitForLoadState()
    }

    
    
}