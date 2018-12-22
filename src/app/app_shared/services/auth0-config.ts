interface AuthConfig {
  clientID: string;
  domain: string;
  redirectUri: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'pwC5E08ZZFytctumrhmI2bFmakYRGhD2',
  domain: 'ckapilla.auth0.com',
  redirectUri: '[set at runtime]',
  callbackURL: 'https://ckapilla.auth0.com/login'
};


export const LOCK_DICTIONARY: any  = {
  error: {
    login: {
      invalid_email_password: 'Wrong email or password'
    }
  },

  login: {
    blocked_user: 'The user is blocked.',
    invalid_user_password: 'Wrong credentials.',
  },

  success: { // success messages show above the form or in a confirmation pane
    logIn: 'Thanks for logging in. / Sesión iniciada con éxito',
    forgotPassword: 'An email is being sent to enable resetting your password.'
    + '/<br/>Hemos enviado un correo para completar el restablecimiento de su contraseña.'
  },

  forgotPasswordTitle: 'Reset Password',
  forgotPasswordSubmitLabel: 'Send email / Enviar contraseña',
  forgotPasswordAction: 'Set password / Establecer contraseña?',
  forgotPasswordInstructions: 'Please enter your email address. We will send you an email to reset your password.'
  + '/<br/>Por favor ingrese su dirección de correo. Le enviaremos las instrucciones para restablecer su contrseña.',


  // lastLoginInstructions: 'Last time you logged in with /<br/>La última vez inició sesión con',
  lastLoginInstructions: 'Click on your email address below /<br/>Haz clic en su dirección de correo:',
  loginLabel: 'LogIn/Iniciar sesión',
  LoginSubmitLabel: 'LogIn/Iniciar sesión',

  // notYourAccountAction: 'Not your account? / ¿No es su cuenta?',
  notYourAccountAction: 'Use different acct or change Password / Cambiar cuenta o contraseña',
  // notYourAccountAction: 'Use different account or Change Password / Usar otra cuenta o Cambiar contraseña',

  passwordInputPlaceholder: 'your password / su contraseña',
   // welcome: 'Not / ¿No es %s?',

  retryLabel: 'Retry',
  sentLabel: 'Sent!',
  showPassword: 'Show password',

  submitLabel: 'Submit',

  blankErrorHint: 'Can\'t be blank / Requerido',
  emailInputPlaceholder: 'your email / su correo electrónico',
  title: 'LogIn/Iniciar sesión',

  welcome: 'Welcome / Bienvenido %s!'

  // welcome: 'Other Account / Otra cuenta?'
};
