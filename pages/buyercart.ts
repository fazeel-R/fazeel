import { expect } from "@playwright/test"
import { wrapperMethod } from "../wrappermethods.ts/wrapper1"

export class BuyerCart extends wrapperMethod {
    async homepage(url: string) {

        await this.url(url)

    }

    async navigatingToCart(locator: string) {
        await this.clickButton(locator)
        //data-id="totalCartItems"

    }

    async deletingItemsFromCart() {
        const deleteItems = this.page.locator('[data-id="deleteItems"]')
        let count =await deleteItems.count()
        //const warehouseCount = await this.page.locator('[data-id="deleteItems"]').count()
        const visible = await deleteItems.first().isVisible()

        if (visible) {
            while (count>0){
                await deleteItems.first().click()
                const deleteConfirmButton = this.page.getByRole('button', { name: 'DELETE', exact: true });

                // We must wait for the confirm button to become enabled before clicking it.
                //await deleteConfirmButton.waitFor({ state: 'visible' })
                await deleteConfirmButton.click();
                count =await deleteItems.count()
                // await this.page.waitForTimeout(1000)
            }
        }
        else {
            console.log("No items to delete under offer under buyer review")
        }
    }
}