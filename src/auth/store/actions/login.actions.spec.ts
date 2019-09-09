import * as fromLogin from './login.actions';

describe('Auth Login Actions', () => {
  describe('LoginAction', () => {
    it('should create an action', () => {
      const email = 'test@testing.com';
      const password = 'password';
      const action = fromLogin.loginAction({email, password});

      expect({ ...action }).toEqual({
        type: fromLogin.LOGIN_ACTION,
        email,
        password
      });
    });
  });

  describe('LoginSuccessAction', () => {
    it('should create an action', () => {
      const email = 'test@testing.com';
      const token = '0234rdREf';
      const action = fromLogin.loginSuccessAction({token, email});

      expect({ ...action }).toEqual({
        type: fromLogin.LOGIN_SUCCESS_ACTION,
        email,
        token
      });
    });
  });

  describe('LoginFailAction', () => {
    it('should create an action', () => {
      const error = { message: 'Fatal exceptions' };
      const action = fromLogin.loginFailAction({error});

      expect({ ...action }).toEqual({
        type: fromLogin.LOGIN_FAIL_ACTION,
        error
      });
    });
  });
});

describe('Auth Logout Actions', () => {
  describe('LogoutAction', () => {
    it('should create an action', () => {
      const action = fromLogin.logoutAction();

      expect({ ...action }).toEqual({
        type: fromLogin.LOGOUT_ACTION
      });
    });
  });
});
