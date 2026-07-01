import { expect } from "@playwright/test";
import { wrapperMethod } from "../wrappermethods.ts/wrapper1";
const data = require('../data.json')

export class AcceptOffers extends wrapperMethod {
    async loadUrl(url: string) {
        await this.url(url)
    }

    async navigateAcceptOffers() {
        await this.page.locator(`//h4[normalize-space()='Stock List Results']`).click()
    }
    //const header = this.page.locator(`..margin-right-1`).first().innerText()
    //await expect(header).toHaveText(`Settings / Stock List Results`)


    async selectAcceptOffersTab() {
        await this.clickButton(`[data-id="acceptOffers"]`)
    }

    async enableAcceptOffers() {
        //const button = await this.page.locator(`[data-id="acceptOffer"]`).isChecked()

        //await this.page.locator(`//input[@class='PrivateSwitchBase-input-23 MuiSwitch-input']`).first().setChecked(true)

        // const toggle = this.page.getByRole('checkbox', {
        //     name: /accept offers at selected warehouses/i
        // });

        // await toggle.waitFor({ state: 'visible' });
        // await toggle.setChecked(true);
        const acceptOffer =this.page.getByRole('checkbox').first()
        const condition =await acceptOffer.isChecked()
        if(!condition){
            await acceptOffer.click()
            await this.clickButton(`[data-id="saveChanges"]`)
            await expect(this.page.getByRole('alert')).toHaveText('Changes saved successfully')
        }

        




    }







}