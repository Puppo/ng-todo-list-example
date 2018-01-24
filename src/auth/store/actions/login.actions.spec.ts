import * as fromLogin from './login.actions';

describe('Auth Login Actions', () => {
  describe('LoginAction', () => {
    it('should create an action', () => {
      const email = 'test@testing.com';
      const password = 'password';
      const action = new fromLogin.LoginAction(email, password);

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
      const action = new fromLogin.LoginSuccessAction(token, email);

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
      const action = new fromLogin.LoginFailAction(error);

      expect({ ...action }).toEqual({
        type: fromLogin.LOGIN_FAIL_ACTION,
        error
      });
    });
  });
});

describe('Logout Actions', () => {
  describe('LogoutAction', () => {
    it('should create an action', () => {
      const action = new fromLogin.LogoutAction();

      expect({ ...action }).toEqual({
        type: fromLogin.LOGOUT_ACTION
      });
    });
  });
});
