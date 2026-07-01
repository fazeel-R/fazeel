import test from '@playwright/test';
import { buyerLoginAndSaveToken } from '../../Api/buyerLogin';
import {getBuyerOffers} from '../../Api/buyerApi';

test(`Buyer login`, async()=>{
    await buyerLoginAndSaveToken()
})

test (`Get Buyer Offers`, async({page})=>{
    await getBuyerOffers()
})

