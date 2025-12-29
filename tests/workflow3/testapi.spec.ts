import { test, expect } from '@playwright/test';
import { loginAdminAndSaveToken } from '../../Api/adminLogin';
import { fetchOrderShippingOptions, getStocklistSettings } from '../../Api/adminApi';
import { readApiJson } from '../../utils/apiFileManager';
import { getAccountSettings } from '../../Api/adminApi';

test.skip('Admin can fetch order shipping options', async () => {
  // 1️⃣ Auth
  await loginAdminAndSaveToken();

  // 2️⃣ Fetch settings
  await fetchOrderShippingOptions();

  // 3️⃣ Read saved response
  const settings = await readApiJson<any>(
    'order-shipping-options.json'
  );

//   expect(settings.orderShippingOptions.length).toBeGreaterThan(0);
console.log(`The maximum insurance amount is :${settings.shippingInsurance.maxInsuranceAmount}`)
  
});
test.skip(`Read account settings`, async({page})=>{
  await loginAdminAndSaveToken()

  await getAccountSettings()

  const settings = await readApiJson<any>(
    'account-settings.json'
  );

})

test.skip(`Read stocklist settings`, async({page})=>{
  await loginAdminAndSaveToken()
  await getStocklistSettings()
  const stocklistSetting = await readApiJson<any>('stocklist-settings.json')
  // if(stocklistSetting.body.408.acceptOffer){

  // }
  

})
