import { expect } from '@playwright/test';
import { getApiContext } from './apiClient';
import { writeApiJson } from '../utils/apiFileManager';
const data = require('../data.json')

export async function buyerLoginAndSaveToken() {
    const api = await getApiContext()
    const response = await api.post(`${data.buyerApiData.buyerApiUrl}`, {
        headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target':
                'AWSCognitoIdentityProviderService.InitiateAuth',
        },
        data: {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: `${data.buyerApiData.clientId}`,
        AuthParameters: {
          USERNAME: `${data.buyerCreds.userName}`,
          PASSWORD: `${data.buyerCreds.password}`,
        },
      },

    })
    expect(response).toBeOK()
    const body = await response.json()
    await writeApiJson('buyer-auth.json', {
    idToken: body.AuthenticationResult.IdToken,
  });
}
// baserUrlforGettingsOffer - https://z15n1kno64.execute-api.us-east-1.amazonaws.com/Integration/px-api-gateway/stocklist/offers