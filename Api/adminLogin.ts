import { expect } from '@playwright/test';
import { getApiContext } from './apiClient';
import { writeApiJson } from '../utils/apiFileManager';
const data = require('../data.json')

export async function loginAdminAndSaveToken() {
  const api = await getApiContext();

  const response = await api.post(
    `${data.adminApiData.adminApiUrl}`,
    {
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target':
          'AWSCognitoIdentityProviderService.InitiateAuth',
      },
      data: {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: `${data.adminApiData.clientId}`,
        AuthParameters: {
          USERNAME: `${data.adminCreds.userName}`,
          PASSWORD: `${data.adminCreds.password}`,
        },
      },
    }
  );

  if (!response.ok()) {
    console.error(await response.json());
  }

  //expect(response.ok()).toBeTruthy();
  expect(response).toBeOK()

  const body = await response.json();

  // Persist token
  await writeApiJson('admin-auth.json', {
    idToken: body.AuthenticationResult.IdToken,
  });
}
