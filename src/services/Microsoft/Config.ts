export const config = {
  appId: process.env.REACT_APP_MS_APP_ID as string,
  redirectUri: process.env.REACT_APP_SERVICE_BASE_URL as string,
  scopes: [`api://${process.env.REACT_APP_MS_APP_ID}/Files.read`],
  scopesGraph: ['user.read'],
};
