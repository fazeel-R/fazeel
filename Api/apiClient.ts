import { request, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

export async function getApiContext() {
  if (!apiContext) {
    apiContext = await request.newContext();
  }
  return apiContext;
}
