import { expect } from '@playwright/test';
import { getApiContext } from './apiClient';
import { readApiJson, writeApiJson } from '../utils/apiFileManager';

const baseUrl = require('../data.json')

export async function fetchOrderShippingOptions() {
  const api = await getApiContext();

  // 🔹 Read token from file
  const auth = await readApiJson<{ idToken: string }>(
    'admin-auth.json'
  );

  const response = await api.get(
    `${baseUrl.adminApiData.baseUrl}settings/order-shipping-options`,
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


export async function getStocklistSettings(){
    let api = await getApiContext()
     const auth = await readApiJson<{ idToken: string }>(
    'admin-auth.json'
  );

    const response = await api.get(`${baseUrl.adminApiData.baseUrl}pxn/stocklist-settings`,{
        headers:{
            Authorization : `Bearer ${auth.idToken}`
        }
    })

    expect(response.status()).toBe(200)
    const body = await response.json()
    await writeApiJson('stocklist-settings.json', body)
}

export async function getAccountSettings(){
    let api = await getApiContext()
     const auth = await readApiJson<{ idToken: string }>(
    'admin-auth.json'
  );

    const response = await api.get(`${baseUrl.adminApiData.baseUrl}account/settings`,{
        headers:{
            Authorization : `Bearer ${auth.idToken}`
        }
    })

    expect(response.status()).toBe(200)
    const body = await response.json()
    await writeApiJson('account-settings.json', body)
}

export async function getSalesOrderSettings(){
    let api = await getApiContext()
    const auth = await readApiJson<{idToken: string}>('admin-auth.json')
    const response = await api.get(`${baseUrl.adminApiData.baseUrl}sales-order/settings`, {
        headers:{
            Authorization : `Bearer ${auth.idToken}`

        }
    })
    expect(response.status()).toBe(200)
    const body = await response.json()
    await writeApiJson('sales-order-settings.json', body)
}

export async function getInventorySettings(){
    const api = await getApiContext()
    const token = await readApiJson<{idToken: string}>('admin-auth.json')
    const response = await api.get(`${baseUrl.adminApiData.baseUrl}inventory/settings`,{
        headers:{
            "authorization": `Bearer ${token.idToken}`
        }
    })
    expect(response.status()).toBe(200)
    const body = await response.json()
    await writeApiJson('inventory-settings.json', body)

}

export async function getAdminAuthorities(){
  const api = await getApiContext()
  const token = await readApiJson<{idToken: string}>('admin-auth.json')
  const response = await api.get(`${baseUrl.adminApiData.baseUrl}security/authorities`,{
    headers:{
      "authorization": `Bearer ${token.idToken}`
    }
  })

  expect(response.status()).toBe(200)
  const body = response.json()
  await writeApiJson('admin-authorities.json',body)

}



