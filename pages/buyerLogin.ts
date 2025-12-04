import { wrapperMethod } from "../wrappermethods.ts/wrapper1"

export class BuyerLogin extends wrapperMethod{

    async loadUrl(url:string){
        await this.url(url)

    }

    async loginDetail(userName:string, passWord:string){
       await this.inputText('[name="email"]', userName)
       await this.inputText('[name="password"]', passWord)

    }

    async login(){
        await this.clickButton('[type="submit"]')
        
    }

}