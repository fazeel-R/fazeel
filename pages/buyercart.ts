import { expect } from "@playwright/test"
import { wrapperMethod } from "../wrappermethods.ts/wrapper1"

export class BuyerCart extends wrapperMethod {
    async homepage(url: string) {

        await this.url(url)

    }

    async navigatingToCart() {
        await this.clickButton('[data-id="totalCartItems"]')
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

                }
            }
            else {
                console.log("No items to delete under offer under buyer review")
            }

        }
    }

    async deleteItemsFromOfferUnderAdminReview() {
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

                }
            }
            else {
                console.log("No items to delete under offer under buyer review")
            }

        }

    }

    async deleteItemsFromOfferUnderAdminReview1() {
        const adminReviewTab = this.page.locator('[data-id="tab"]').nth(2)

        if (!(await adminReviewTab.isEnabled())) {
            console.log('Admin review tab disabled')
            return
        }

        await adminReviewTab.click()

        const deleteItems = this.page.locator('[data-id="deleteItems"]')

        while (await deleteItems.count() > 0) {
            await deleteItems.first().click()

            const confirmDelete = this.page.getByRole('button', {
                name: 'DELETE',
                exact: true,
            })

            // ✅ wait for dialog button only if it appears
            await expect(confirmDelete).toBeVisible()
            await confirmDelete.click()

            // ✅ wait until item is actually removed
            await expect(deleteItems).toHaveCount(
                (await deleteItems.count()) - 1
            )
        }
    }

}