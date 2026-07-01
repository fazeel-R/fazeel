import test, { Page } from '@playwright/test'
export abstract class wrapperMethod{

    page: Page

    constructor(page: Page){
        this.page =page

}
//to load url
async url(url: string){
    await this.page.goto(url)

}
// To filling the forms using locator
async inputText(locator:string, value: string){
    const filltext = this.page.locator(locator)
    await filltext.fill(value)

}

// For click action using the locator
async clickButton(locator:string){
    await this.page.locator(locator).click()

}

async price(){
    await this.page.locator(`[data-id="price"]`)
    //data-id="price"
}

async purchaseQty(Qty:string)  {
    await this.page.locator(`#purchaseQuantity`).fill(Qty)
    
}

}
    