import * as fromLogin from './login.reducer';
import * as fromActions from '../actions/login.actions';

describe('LoginReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { INIT_LOGIN_STATE } = fromLogin;
      const action = {} as any;
      const state = fromLogin.reducer(undefined, action);

      expect(state).toBe(INIT_LOGIN_STATE);
    });
  });

  describe('LOGIN_ACTION action', () => {
    it('should set loading to true', () => {
      const { INIT_LOGIN_STATE } = fromLogin;
      const email = 'test@test.com';
      const password = '123456';
      const action = new fromActions.LoginAction(email, password);
      const state = fromLogin.reducer(INIT_LOGIN_STATE, action);

      expect(state.loading).toEqual(true);
      expect(state.email).toBeNull();
      expect(state.token).toBeNull();
      expect(state.error).toBeNull();
    });
  });

  describe('LOGIN_SUCCESS_ACTION action', () => {
    it('should set user data', () => {
      const { INIT_LOGIN_STATE } = fromLogin;
      const email = 'test@test.com';
      const token = 'erf$35tg';
      const action = new fromActions.LoginSuccessAction(token, email);
      const state = fromLogin.reducer(INIT_LOGIN_STATE, action);

      expect(state.loading).toEqual(false);
      expect(state.email).toEqual(email);
      expect(state.token).toEqual(token);
      expect(state.error).toBeNull();
    });
  });

  describe('LOGIN_FAIL_ACTION action', () => {
    it('should set error', () => {
      const { INIT_LOGIN_STATE } = fromLogin;
      const error = { message: 'Fatal Exception' };
      const action = new fromActions.LoginFailAction(error);
      const state = fromLogin.reducer(INIT_LOGIN_STATE, action);

      expect(state.loading).toEqual(false);
      expect(state.email).toBeNull();
      expect(state.token).toBeNull();
      expect({ ...state.error }).toEqual({ ...error });
    });
  });
});
