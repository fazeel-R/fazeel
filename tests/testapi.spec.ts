import { test, expect } from '@playwright/test';
import { loginAdminAndSaveToken } from '../Api/adminLogin';
import { fetchOrderShippingOptions } from '../Api/orderShipping';
import { readApiJson } from '../utils/apiFileManager';

test('Admin can fetch order shipping options', async () => {
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
