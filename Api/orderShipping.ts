import { expect } from '@playwright/test';
import { getApiContext } from './apiClient';
import { readApiJson, writeApiJson } from '../utils/apiFileManager';

export async function fetchOrderShippingOptions() {
  const api = await getApiContext();

  // 🔹 Read token from file
  const auth = await readApiJson<{ idToken: string }>(
    'admin-auth.json'
  );

  const response = await api.get(
    'https://z15n1kno64.execute-api.us-east-1.amazonaws.com/Integration/px-api-gateway/settings/order-shipping-options',
    {
      headers: {
        Authorization: `Bearer ${auth.idToken}`,
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  await writeApiJson('order-shipping-options.json', body);
}
