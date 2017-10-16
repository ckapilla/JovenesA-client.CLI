interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'pwC5E08ZZFytctumrhmI2bFmakYRGhD2',
  domain: 'ckapilla.auth0.com',
  callbackURL: 'http://localhost:3000/callback'
};
