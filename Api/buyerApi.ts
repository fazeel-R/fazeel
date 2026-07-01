import { expect } from '@playwright/test';
import { getApiContext } from './apiClient';
import { readApiJson, writeApiJson } from '../utils/apiFileManager';


const url = require('../data.json')

export async function getBuyerOffers() {
    const api = await getApiContext()
    const auth = await readApiJson<{ idToken: string }>(
        'buyer-auth.json'
    );
    const response = await api.get(`${url.buyerApiData.baseUrl}stocklist/offers`, {
        headers: {
            authorization: `Bearer ${auth.idToken}`
        }
    })
    expect(response.status()).toBe(200);

    const body = await response.json();
    await writeApiJson('buyer-offers.json', body);

}