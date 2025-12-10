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
        let count = await deleteItems.count()
        const visible = await deleteItems.first().isVisible()

        if (visible) {
            while (count > 0) {
                await deleteItems.first().click()
                    const deleteConfirmButton = this.page.getByRole('button', { name: 'DELETE', exact: true });

                    // We must wait for the confirm button to become enabled before clicking it.
                    //await deleteConfirmButton.waitFor({ state: 'visible' })
                    await deleteConfirmButton.click();
                    await this.page.waitForTimeout(1000)
                    count = await deleteItems.count()
            }
        }
        else {
            console.log("No items to delete under offer under cart tab")
        }
    }

    async deleteItemsFromOfferAwaitingBuyerReview() {
        const buyerReviewtab = await this.page.locator('[data-id="tab"]').nth(1).isEnabled()
        const deleteItems = this.page.locator('[data-id="deleteItems"]')
        if (buyerReviewtab) {
            await this.page.locator('[data-id="tab"]').nth(1).click()
            let count = await deleteItems.count()
            const visible = await deleteItems.first().isVisible()
            if (visible) {
                while (count > 0) {
                    await deleteItems.first().click()
                    const deleteConfirmButton = this.page.getByRole('button', { name: 'DELETE', exact: true });

                    // We must wait for the confirm button to become enabled before clicking it.
                    //await deleteConfirmButton.waitFor({ state: 'visible' })
                    await deleteConfirmButton.click();
                    await this.page.waitForTimeout(1000)
                    count = await deleteItems.count()
                    
            }}
            else {
                console.log("No items to delete under offer under buyer review")
            }

        }
    }

    async deleteItemsFromOfferUnderAdminReview(){
        const buyerReviewtab = await this.page.locator('[data-id="tab"]').nth(2).isEnabled()
        const deleteItems = this.page.locator('[data-id="deleteItems"]')
        if (buyerReviewtab) {
            await this.page.locator('[data-id="tab"]').nth(2).click()
            let count = await deleteItems.count()
            const visible = await deleteItems.first().isVisible()
            if (visible) {
                while (count > 0) {
                    await deleteItems.first().click()
                    const deleteConfirmButton = this.page.getByRole('button', { name: 'DELETE', exact: true });

                    // We must wait for the confirm button to become enabled before clicking it.
                    //await deleteConfirmButton.waitFor({ state: 'visible' })
                    await deleteConfirmButton.click();
                    await this.page.waitForTimeout(1000)
                    count = await deleteItems.count()
                    
            }}
            else {
                console.log("No items to delete under offer under buyer review")
            }

        }

    }
}