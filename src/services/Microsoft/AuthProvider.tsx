import { UserAgentApplication } from 'msal';
import { config } from 'services/Microsoft/Config';
import {
  isAuthenticatedAuth,
  profilePicture,
} from 'store/auth/authSlice';
import store from 'store';
import { getUserProfilePicture } from './GraphService';

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Initialize the MSAL application object
export const userAgentApplication = new UserAgentApplication({
  auth: {
    clientId: config.appId,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MS_TENANT_ID}`,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
});

function isInteractionRequired(error: Error): boolean {
  if (!error.message || error.message.length <= 0) {
    return false;
  }

  return (
    error.message.indexOf('consent_required') > -1 ||
    error.message.indexOf('interaction_required') > -1 ||
    error.message.indexOf('login_required') > -1
  );
}

// </getUserProfileSnippet>

export function logout() {
  userAgentApplication.logout();
}

async function getAccessToken(scopes: string[]): Promise<string> {
  try {
    // Get the access token silently
    // If the cache contains a non-expired token, this function
    // will just return the cached token. Otherwise, it will
    // make a request to the Azure OAuth endpoint to get a token
    const silentResult = await userAgentApplication.acquireTokenSilent(
      {
        scopes: scopes,
      },
    );

    return silentResult.accessToken;
  } catch (err) {
    // If a silent request fails, it may be because the user needs
    // to login or grant consent to one or more of the requested scopes
    if (isInteractionRequired(err)) {
      const interactiveResult = await userAgentApplication.acquireTokenPopup(
        {
          scopes: scopes,
        },
      );

      return interactiveResult.accessToken;
    } else {
      throw err;
    }
  }
}

// <getUserProfileSnippet>
export async function getUserProfile() {
  try {
    const accessToken = await getAccessToken(config.scopes);

    if (accessToken) {
      // Get the user's profile from Graph
      //const user = await getUserDetails(accessToken);

      store.dispatch(isAuthenticatedAuth(true));

      return accessToken;
    }
  } catch (err) {
    store.dispatch(isAuthenticatedAuth(false));
    /* this.setState({
      isAuthenticated: false,
      user: {},
      error: this.normalizeError(err),
    }); */
  }
}

export async function getAvatar() {
  try {
    const accessToken = await getAccessToken(config.scopesGraph);

    if (accessToken) {
      // Get the user's profile from Graph
      //const user = await getUserDetails(accessToken);
      const avatar = await getUserProfilePicture(accessToken);

      store.dispatch(profilePicture(avatar));
      /*    this.setState({
        isAuthenticated: true,
        user: {
          displayName: user.displayName,
          email: user.mail || user.userPrincipalName,
        },
        error: null,
      }); */
    }
  } catch (err) {
    /* this.setState({
      isAuthenticated: false,
      user: {},
      error: this.normalizeError(err),
    }); */
  }
}

export async function login() {
  try {
    // Login via popup
    await userAgentApplication.loginPopup({
      scopes: config.scopesGraph,
      prompt: 'select_account',
    });
    // After login, get the user's profile
    const token = await getUserProfile();
    return token;
  } catch (err) {
    store.dispatch(isAuthenticatedAuth(false));
    /*   this.setState({
      isAuthenticated: false,
      user: {},
      error: this.normalizeError(err),
    }); */
  }
}

/* function normalizeError(error: string | Error): any {
  let normalizedError = {};
  if (typeof error === 'string') {
    const errParts = error.split('|');
    normalizedError =
      errParts.length > 1
        ? { message: errParts[1], debug: errParts[0] }
        : { message: error };
  } else {
    normalizedError = {
      message: error.message,
      debug: JSON.stringify(error),
    };
  }
  return normalizedError;
}
 */
