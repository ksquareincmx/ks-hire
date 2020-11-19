// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <graphServiceSnippet1>

import { Client } from '@microsoft/microsoft-graph-client';

function getAuthenticatedClient(accessToken: string) {
  // Initialize Graph client
  const client = Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done: any) => {
      done(null, accessToken);
    },
  });

  return client;
}

export async function getUserDetails(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client.api('/me').get();
  return user;
}

export async function getUserProfilePicture(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const avatar = await client.api('/me/photos/48x48/$value').get();
  const blob = new Blob([avatar], { type: 'image/jpeg' });
  const urlAvatar = URL.createObjectURL(blob);
  return urlAvatar;
}
// </graphServiceSnippet1>
